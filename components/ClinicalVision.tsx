
import React, { useState, useRef } from 'react';
import { analyzeMedicalImage } from '../services/geminiService';

type AnalysisType = 'EKG' | 'AGD';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

const ResultDisplay = ({ text }: { text: string }) => {
  const content = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map((line, index) => {
      if (line.startsWith('- ')) {
        return `<li key=${index} class="flex items-start gap-3"><span class="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>${line.substring(2)}</li>`;
      }
      if (line.startsWith('<strong class="text-slate-800">PENTING:')) {
        const cleanedLine = line.replace(/<strong class="text-slate-800">|<\/strong>/g, '');
        return `<div key=${index} class="mt-6 p-4 bg-amber-50 text-amber-800 text-xs font-semibold rounded-2xl border border-amber-100"><strong>${cleanedLine}</strong></div>`;
      }
      return `<p key=${index}>${line}</p>`;
    }).join('');

  return <div className="text-sm text-slate-600 leading-relaxed space-y-3 prose" dangerouslySetInnerHTML={{ __html: content }} />;
};


const ClinicalVision: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('EKG');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (file: File | null) => {
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("Ukuran file maksimal adalah 4MB.");
        return;
      }
      setImageFile(file);
      setImageSrc(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const base64Data = await fileToBase64(imageFile);
      const analysisResult = await analyzeMedicalImage(base64Data, imageFile.type, analysisType);
      setResult(analysisResult);
    } catch (e) {
      setError("Gagal menganalisis gambar. Mohon coba lagi.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Clinical Vision</h2>
        <p className="text-slate-500">Analisis visual instan untuk EKG dan Analisa Gas Darah (AGD) dengan AI.</p>
      </section>
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 sticky top-8">
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
            {(['EKG', 'AGD'] as AnalysisType[]).map(type => (
              <button
                key={type}
                onClick={() => {
                  setAnalysisType(type);
                  setImageSrc(null);
                  setImageFile(null);
                  setResult(null);
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                  analysisType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-white/50'
                }`}
              >
                {type === 'EKG' ? 'Interpretasi EKG' : 'Analisa Gas Darah'}
              </button>
            ))}
          </div>

          <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
            {imageSrc ? (
              <img src={imageSrc} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center text-slate-400 p-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <p className="mt-2 text-xs font-bold">Pratinjau Gambar</p>
              </div>
            )}
          </div>
          
          <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={e => handleImageSelect(e.target.files?.[0] || null)} />
          <input type="file" ref={cameraInputRef} hidden accept="image/*" capture="environment" onChange={e => handleImageSelect(e.target.files?.[0] || null)} />

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3 rounded-xl font-semibold transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              Upload
            </button>
            <button onClick={() => cameraInputRef.current?.click()} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3 rounded-xl font-semibold transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Kamera
            </button>
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={!imageFile || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Menganalisis...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Analisis Gambar
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[500px]">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800">Hasil Interpretasi AI</h3>
          </div>
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6" />
              <p className="font-bold text-slate-700">Memproses Citra Medis...</p>
              <p className="text-xs text-slate-400 mt-1">AI sedang menganalisis setiap detail gambar.</p>
            </div>
          )}
          
          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          {result && (
            <div className="animate-in fade-in duration-500">
               <ResultDisplay text={result} />
            </div>
          )}

          {!loading && !result && (
            <div className="py-20 text-center text-slate-400">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              <p className="mt-4 font-bold">Hasil analisis akan muncul di sini.</p>
              <p className="text-xs mt-1">Unggah gambar EKG atau AGD untuk memulai.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalVision;
