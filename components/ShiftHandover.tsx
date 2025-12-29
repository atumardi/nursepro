
import React, { useState } from 'react';
import { polishSBAR } from '../services/geminiService';
import { SBARData } from '../types';

const ShiftHandover: React.FC = () => {
  const [data, setData] = useState<SBARData>({
    situation: '',
    background: '',
    assessment: '',
    recommendation: ''
  });
  const [loading, setLoading] = useState(false);

  const handlePolish = async () => {
    setLoading(true);
    try {
      const polished = await polishSBAR(data);
      setData(polished);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `SBAR HANDOVER\n\n[S] Situation: ${data.situation}\n[B] Background: ${data.background}\n[A] Assessment: ${data.assessment}\n[R] Recommendation: ${data.recommendation}`;
    navigator.clipboard.writeText(text);
    alert('SBAR disalin ke clipboard!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Shift Handover (SBAR)</h2>
        <p className="text-slate-500">Susun laporan operan shift yang profesional dan terstruktur menggunakan bantuan AI.</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-2">S - Situation</label>
              <textarea
                value={data.situation}
                onChange={(e) => setData({ ...data, situation: e.target.value })}
                placeholder="Nama pasien, usia, diagnosa medis, keluhan utama saat ini..."
                className="w-full h-24 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-2">B - Background</label>
              <textarea
                value={data.background}
                onChange={(e) => setData({ ...data, background: e.target.value })}
                placeholder="Riwayat penyakit, prosedur yang sudah dilakukan, riwayat alergi..."
                className="w-full h-24 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-2">A - Assessment</label>
              <textarea
                value={data.assessment}
                onChange={(e) => setData({ ...data, assessment: e.target.value })}
                placeholder="Hasil TTV, GCS, hasil lab abnormal, kondisi klinis terkini..."
                className="w-full h-24 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-2">R - Recommendation</label>
              <textarea
                value={data.recommendation}
                onChange={(e) => setData({ ...data, recommendation: e.target.value })}
                placeholder="Rencana tindakan, observasi yang harus dilanjutkan, instruksi dokter..."
                className="w-full h-24 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 flex flex-col h-full">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Handover Preview</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handlePolish}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors disabled:opacity-50"
                  title="Professionalize with AI"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  )}
                </button>
                <button 
                  onClick={handleCopy}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Situation</p>
                <p className="text-sm leading-relaxed text-slate-300">{data.situation || '-'}</p>
              </div>
              <div className="border-l-2 border-slate-700 pl-4 py-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Background</p>
                <p className="text-sm leading-relaxed text-slate-300">{data.background || '-'}</p>
              </div>
              <div className="border-l-2 border-slate-700 pl-4 py-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Assessment</p>
                <p className="text-sm leading-relaxed text-slate-300">{data.assessment || '-'}</p>
              </div>
              <div className="border-l-2 border-green-500 pl-4 py-1">
                <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">Recommendation</p>
                <p className="text-sm leading-relaxed text-slate-300">{data.recommendation || '-'}</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 italic mt-auto pt-4 border-t border-white/5">
              *Gunakan tombol petir untuk merapikan catatan Anda menjadi bahasa medis profesional secara instan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftHandover;
