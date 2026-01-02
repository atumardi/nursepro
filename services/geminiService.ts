
import { GoogleGenAI, Type } from "@google/genai";
import { AskepDiagnosis, QuizQuestion, SBARData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMedicalImage = async (base64Data: string, mimeType: string, type: 'EKG' | 'AGD'): Promise<string> => {
  let prompt;
  const fullDisclaimer = "**PENTING: Analisis ini dihasilkan oleh AI dan hanya bersifat sebagai referensi pendukung (Decision Support). Hasil ini bukan merupakan diagnosis final. Segera konsultasikan hasil ini dengan dokter spesialis jantung (Kardiolog) atau dokter penanggung jawab pasien sebelum mengambil tindakan medis.**";

  if (type === 'EKG') {
    prompt = `Anda adalah Asisten AI Medis yang sangat terspesialisasi dalam interpretasi Elektrokardiogram (EKG). Tujuan utama Anda adalah untuk membantu staf perawat dengan memberikan analisis awal yang terstruktur dari gambar EKG.

IKUTI PROTOKOL ANALISIS INI DENGAN KETAT:
1.  **Kualitas Gambar**: Nilai apakah garis grid dan gelombang EKG jelas. Jika buram, minta foto yang lebih jelas.
2.  **Laju & Irama**: Perkirakan Denyut Jantung (BPM) dan tentukan apakah iramanya teratur atau tidak teratur.
3.  **Morfologi Gelombang**:
    -   Gelombang P: Ada/Tidak Ada, Rasio terhadap QRS.
    -   Interval PR: Normal (0.12-0.20s) atau Memanjang.
    -   Kompleks QRS: Sempit (<0.12s) atau Lebar.
    -   Segmen ST: Isoelektrik, Elevasi, atau Depresi.
    -   Gelombang T: Normal, Terbalik, atau Runcing.
4.  **Interpretasi Awal**: Sebutkan ritme yang paling mungkin (misalnya, Irama Sinus Normal, Fibrilasi Atrium, Bradikardia Sinus, dll.).

GAYA KOMUNIKASI:
-   Gunakan terminologi klinis yang profesional.
-   Ringkas dan terstruktur menggunakan poin-poin (bullet points).
-   Balas dalam Bahasa Indonesia.

Di akhir setiap analisis, Anda WAJIB menyertakan peringatan penting berikut dalam format tebal (markdown bold) persis seperti ini:
${fullDisclaimer}`;
  } else { // AGD
    prompt = `Anda adalah asisten AI medis spesialis perawatan kritis. Analisis gambar hasil Analisa Gas Darah (AGD) ini. Berikan interpretasi sistematis dalam format MARKDOWN yang meliputi nilai-nilai berikut dan interpretasinya:

- **pH**: (nilai)
- **PaCO2**: (nilai)
- **HCO3**: (nilai)
- **PaO2**: (nilai)
- **Base Excess (BE)**: (nilai)
- **Interpretasi Akhir**: Berikan kesimpulan (misal: Asidosis Respiratorik terkompensasi sebagian, Alkalosis Metabolik).

Gaya Komunikasi: Gunakan terminologi klinis profesional dan balas dalam Bahasa Indonesia.

Di akhir setiap analisis, Anda WAJIB menyertakan peringatan penting berikut dalam format tebal (markdown bold) persis seperti ini:
${fullDisclaimer}`;
  }

  const imagePart = { inlineData: { data: base64Data, mimeType } };
  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
  });
  
  return response.text;
};

export const generateAskep = async (patientData: string): Promise<AskepDiagnosis[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following patient data and generate the appropriate Indonesian Nursing Diagnoses (SDKI). 
    Patient Data: "${patientData}"
    
    Rules:
    - Return a list of possible SDKI diagnoses.
    - Each diagnosis must follow the SDKI format: Problem (Masalah), Etiology (Penyebab), and Signs/Symptoms (Tanda dan Gejala).
    - Language: Indonesian.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING },
            name: { type: Type.STRING },
            category: { type: Type.STRING },
            definition: { type: Type.STRING },
            causes: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            signs: {
              type: Type.OBJECT,
              properties: {
                major: { type: Type.ARRAY, items: { type: Type.STRING } },
                minor: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["major", "minor"]
            }
          },
          required: ["code", "name", "category", "definition", "causes", "signs"],
          propertyOrdering: ["code", "name", "category", "definition", "causes", "signs"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Failed to parse Askep response", error);
    return [];
  }
};

export const polishSBAR = async (rawSBAR: SBARData): Promise<SBARData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Rapikan data operan perawat berikut menjadi bahasa medis yang profesional dan ringkas (format SBAR).
    Situation: ${rawSBAR.situation}
    Background: ${rawSBAR.background}
    Assessment: ${rawSBAR.assessment}
    Recommendation: ${rawSBAR.recommendation}
    
    Gunakan istilah medis yang tepat dalam Bahasa Indonesia.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          situation: { type: Type.STRING },
          background: { type: Type.STRING },
          assessment: { type: Type.STRING },
          recommendation: { type: Type.STRING }
        },
        required: ["situation", "background", "assessment", "recommendation"]
      }
    }
  });

  try {
    return JSON.parse(response.text || JSON.stringify(rawSBAR));
  } catch (error) {
    return rawSBAR;
  }
};

export const generateQuizQuestions = async (topic: string, count: number = 5): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create ${count} high-quality nursing practice questions about "${topic}" in Indonesian. Include options, correct answer index, and a brief explanation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Failed to parse Quiz response", error);
    return [];
  }
};

export const processQuizDocument = async (base64Data: string, mimeType: string): Promise<QuizQuestion[]> => {
  const documentPart = { inlineData: { data: base64Data, mimeType } };
  const textPart = { text: "Ekstrak semua pertanyaan pilihan ganda tentang keperawatan dari dokumen ini. Pastikan untuk mengambil pertanyaan, 4 pilihan jawaban, indeks jawaban yang benar (0-3), dan penjelasan singkat mengapa jawaban tersebut benar. Jika dokumen tidak memiliki format soal, buatlah 5 soal berdasarkan materi di dokumen tersebut. Gunakan Bahasa Indonesia." };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: [documentPart, textPart] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Failed to parse Document Quiz response", error);
    return [];
  }
};
