
import { GoogleGenAI, Type } from "@google/genai";
import { AskepDiagnosis, QuizQuestion, SBARData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMedicalImage = async (base64Data: string, mimeType: string, type: 'EKG' | 'AGD'): Promise<string> => {
  let prompt;
  if (type === 'EKG') {
    prompt = `Anda adalah asisten AI medis spesialis kardiologi. Tugas Anda adalah membantu perawat menganalisis gambar EKG ini. Berikan analisis sistematis dalam format MARKDOWN yang meliputi:

- **Irama (Rhythm)**: Reguler atau tidak reguler.
- **Laju Jantung (Heart Rate)**: Estimasi dalam bpm.
- **Gelombang P**: Normal, tidak ada, atau anomali.
- **Kompleks QRS**: Sempit atau lebar, durasi estimasi.
- **Gelombang T**: Normal, inverted, atau anomali.
- **Interval**: Estimasi interval PR, QRS, dan QT.
- **Interpretasi Awal**: Berikan 2-3 kemungkinan indikasi (misal: Sinus Takikardia, Atrial Fibrilasi, dll).

PENTING: Selalu sertakan disclaimer di akhir: "**Disclaimer: Analisis ini bersifat referensi dan harus dikonfirmasi oleh dokter spesialis jantung (Kardiolog).**"`;
  } else { // AGD
    prompt = `Anda adalah asisten AI medis spesialis perawatan kritis. Analisis gambar hasil Analisa Gas Darah (AGD) ini. Berikan interpretasi sistematis dalam format MARKDOWN yang meliputi nilai-nilai berikut dan interpretasinya:

- **pH**: (nilai)
- **PaCO2**: (nilai)
- **HCO3**: (nilai)
- **PaO2**: (nilai)
- **Base Excess (BE)**: (nilai)
- **Interpretasi Akhir**: Berikan kesimpulan (misal: Asidosis Respiratorik terkompensasi sebagian, Alkalosis Metabolik).

PENTING: Selalu sertakan disclaimer di akhir: "**Disclaimer: Analisis ini bersifat referensi dan harus dikonfirmasi oleh dokter penanggung jawab.**"`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      },
      { text: prompt }
    ]
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
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      },
      {
        text: "Ekstrak semua pertanyaan pilihan ganda tentang keperawatan dari dokumen ini. Pastikan untuk mengambil pertanyaan, 4 pilihan jawaban, indeks jawaban yang benar (0-3), dan penjelasan singkat mengapa jawaban tersebut benar. Jika dokumen tidak memiliki format soal, buatlah 5 soal berdasarkan materi di dokumen tersebut. Gunakan Bahasa Indonesia."
      }
    ],
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
