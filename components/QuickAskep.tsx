
import React, { useState, useEffect } from 'react';
import { generateAskep } from '../services/geminiService';
import { AskepDiagnosis } from '../types';

const QuickAskep: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AskepDiagnosis[]>([]);
  const [history, setHistory] = useState<AskepDiagnosis[][]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nurse_askep_history') || '[]');
    setHistory(saved);
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const diagnoses = await generateAskep(input);
      setResults(diagnoses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveToLogbook = () => {
    const newHistory = [results, ...history].slice(0, 10); // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('nurse_askep_history', JSON.stringify(newHistory));
    alert('Diagnosa disimpan ke Logbook!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Quick Askep</h2>
          <p className="text-slate-500">Generate diagnosa keperawatan (SDKI) secara instan dari data pengkajian.</p>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {showHistory ? 'Tutup Riwayat' : 'Lihat Logbook'}
        </button>
      </section>

      {showHistory && (
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4 animate-in slide-in-from-top duration-300">
          <h3 className="text-sm font-black text-blue-800 uppercase tracking-widest">Riwayat Logbook Terakhir</h3>
          {history.length === 0 ? (
            <p className="text-sm text-blue-400 italic">Belum ada diagnosa yang disimpan.</p>
          ) : (
            <div className="grid gap-3">
              {history.map((h, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setResults(h); setShowHistory(false); }}
                  className="bg-white p-4 rounded-2xl text-left border border-blue-100 hover:shadow-md transition-shadow group flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{h[0]?.name}...</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black">{h.length} Diagnosa Terdeteksi</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Contoh: Pasien laki-laki usia 45 tahun mengeluh sesak nafas sejak 2 jam lalu. RR 28x/menit, SpO2 92%, suara nafas ronkhi di basal paru, terdapat retraksi dinding dada..."
          className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
        />
        <div className="flex justify-end gap-3">
          {results.length > 0 && (
             <button
                onClick={saveToLogbook}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Simpan ke Logbook
              </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md shadow-blue-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Menganalisis...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Generate Diagnosa
              </>
            )}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4">Hasil Analisis Diagnosa</h3>
          </div>
          <div className="grid gap-6">
            {results.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase">{item.code}</span>
                  <span className="text-xs text-slate-400">{item.category}</span>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h4>
                    <p className="text-sm text-slate-600 italic">"{item.definition}"</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Penyebab (Etiologi)
                      </h5>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {item.causes.map((cause, i) => <li key={i}>{cause}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Tanda & Gejala Mayor
                      </h5>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {item.signs.major.map((sign, i) => <li key={i}>{sign}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAskep;
