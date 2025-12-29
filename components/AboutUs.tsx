
import React from 'react';

interface AboutUsProps {
  onNavigateToPrivacy: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onNavigateToPrivacy }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <section className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-100 mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Tentang NursePro</h2>
        <p className="text-slate-500 max-w-lg mx-auto font-medium">
          Membangun masa depan keperawatan digital yang lebih cerdas, efisien, dan berbasis bukti.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Visi & Misi</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            NurseAssistant Pro dikembangkan untuk menjadi mitra digital utama bagi perawat di seluruh Indonesia. Kami percaya bahwa teknologi AI dapat membantu mengurangi beban administratif, memungkinkan perawat untuk lebih fokus pada perawatan pasien yang humanis.
          </p>
          <div className="space-y-3">
             <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">Automasi asuhan keperawatan (SDKI/SLKI/SIKI).</p>
             </div>
             <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">Akurasi tinggi dalam kalkulasi klinis.</p>
             </div>
             <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">Peningkatan kompetensi melalui Nurse Expert.</p>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Informasi Kontak</h3>
            <p className="text-slate-400 text-xs uppercase font-black tracking-widest">Organisasi Pengembang</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Nama Organisasi</p>
                <p className="font-bold text-lg text-white">deiari</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Alamat Kantor</p>
                <p className="font-bold text-white leading-tight">Jakarta Timur, DKI Jakarta</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Email Support</p>
                <p className="font-bold text-white">dinnerout13may@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 text-center space-y-6 shadow-sm">
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Butuh Bantuan Lebih Lanjut?</h3>
            <p className="text-sm text-slate-500 font-medium">Tim kami siap membantu Anda mengoptimalkan penggunaan NursePro di unit kerja Anda.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <a 
            href="mailto:dinnerout13may@gmail.com" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 w-full sm:w-auto justify-center"
          >
            Hubungi Kami Sekarang
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <button 
            onClick={onNavigateToPrivacy}
            className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all w-full sm:w-auto"
          >
            Kebijakan Privasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
