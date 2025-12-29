
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <section className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl shadow-xl mb-4 text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Kebijakan Privasi</h2>
        <p className="text-slate-500 font-medium">Terakhir Diperbarui: 24 Mei 2024</p>
      </section>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 text-slate-600 leading-relaxed">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">1. Pendahuluan</h3>
          <p className="text-sm">
            Selamat datang di <strong>NurseAssistant Pro (NursePro)</strong>. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan aplikasi kami. Aplikasi ini dikelola oleh <strong>deiari</strong>.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">2. Informasi yang Kami Kumpulkan</h3>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">A. Data Akun:</p>
            <p className="text-sm">
              Nama lengkap, alamat email, dan kredensial login yang Anda berikan saat melakukan pendaftaran atau masuk melalui layanan pihak ketiga (Google).
            </p>
            <p className="text-sm font-semibold text-slate-700">B. Data Operasional & Klinis:</p>
            <p className="text-sm">
              Input teks yang Anda berikan pada fitur <em>Quick Askep</em> dan <em>SBAR Handover</em>. Kami menegaskan bahwa data pasien yang diinputkan <strong>tidak boleh mengandung identitas asli pasien (Anonimitas)</strong>. Data ini diproses secara <em>real-time</em> oleh AI dan disimpan di penyimpanan lokal (Local Storage) perangkat Anda jika Anda memilih untuk menyimpannya di Logbook.
            </p>
            <p className="text-sm font-semibold text-slate-700">C. Data Akademik:</p>
            <p className="text-sm">
              Riwayat skor ujian, progres belajar, dan bank soal yang Anda unggah disimpan untuk keperluan personalisasi pengalaman belajar Anda.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">3. Penggunaan Informasi</h3>
          <p className="text-sm">Kami menggunakan informasi yang dikumpulkan untuk:</p>
          <ul className="list-disc list-inside text-sm space-y-2 ml-4">
            <li>Menyediakan layanan analisis asuhan keperawatan berbasis AI.</li>
            <li>Memungkinkan sinkronisasi progres belajar pada akun Anda.</li>
            <li>Mengirimkan informasi teknis atau pembaruan layanan melalui email.</li>
            <li>Menganalisis penggunaan aplikasi untuk meningkatkan kualitas fitur kami.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">4. Perlindungan Data Pasien</h3>
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
            <p className="text-xs text-blue-700 font-bold uppercase tracking-widest mb-2">PENTING:</p>
            <p className="text-sm text-blue-800 font-medium">
              Sesuai dengan etika keperawatan dan UU Perlindungan Data Pribadi (UU PDP), pengguna <strong>dilarang keras</strong> memasukkan Nama Lengkap Pasien, Nomor Rekam Medis yang terlihat jelas, atau alamat pasien ke dalam kolom input AI. Gunakan inisial atau variabel (seperti "Tn. A" atau "Ny. B") untuk menjaga kerahasiaan.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">5. Berbagi Data dengan Pihak Ketiga</h3>
          <p className="text-sm">
            Kami tidak menjual data pribadi Anda. Namun, kami menggunakan <strong>Google Gemini API</strong> untuk memproses input klinis dan <strong>Google AdSense</strong> untuk menampilkan iklan. Data yang dikirim ke Google API bersifat teknis untuk pemrosesan kecerdasan buatan.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">6. Keamanan</h3>
          <p className="text-sm">
            Kami menerapkan standar enkripsi industri untuk melindungi data saat dalam perjalanan (transit) dan saat disimpan. Meskipun demikian, tidak ada metode transmisi atau penyimpanan digital yang 100% aman, sehingga kami tidak dapat menjamin keamanan absolut.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">7. Hak Anda</h3>
          <p className="text-sm">Anda berhak untuk:</p>
          <ul className="list-disc list-inside text-sm space-y-2 ml-4">
            <li>Mengakses dan memperbarui profil pribadi Anda.</li>
            <li>Menghapus riwayat Logbook dan skor ujian (melalui pengaturan di perangkat Anda).</li>
            <li>Menonaktifkan akun Anda dengan menghubungi dukungan kami.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">8. Hubungi Kami</h3>
          <p className="text-sm">
            Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami di:
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-800">deiari</p>
            <p className="text-sm text-slate-500">Jakarta Timur, Indonesia</p>
            <p className="text-sm text-blue-600 font-bold mt-1">dinnerout13may@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium italic">
          Dengan menggunakan NurseAssistant Pro, Anda dianggap telah membaca dan menyetujui seluruh ketentuan dalam Kebijakan Privasi ini.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
