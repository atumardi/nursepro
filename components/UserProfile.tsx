
import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userName: string;
  userEmail: string;
  onUpdateProfile: (name: string, email: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userName, userEmail, onUpdateProfile }) => {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [isEditing, setIsEditing] = useState(false);
  
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Simulated Stats (in a real app, these would come from props or a database)
  const [stats, setStats] = useState({
    askep: 0,
    quiz: 0,
    sbar: 0
  });

  useEffect(() => {
    const askepHistory = JSON.parse(localStorage.getItem('nurse_askep_history') || '[]');
    const quizHistory = JSON.parse(localStorage.getItem('nurse_quiz_history') || '[]');
    setStats({
      askep: askepHistory.length,
      quiz: quizHistory.length,
      sbar: 12 // Simulated SBAR count
    });
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name, email);
    setIsEditing(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassMessage({ type: 'error', text: 'Password baru dan konfirmasi tidak cocok.' });
      return;
    }
    if (newPass.length < 6) {
      setPassMessage({ type: 'error', text: 'Password baru minimal 6 karakter.' });
      return;
    }
    setPassMessage({ type: 'success', text: 'Password berhasil diperbarui!' });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setPassMessage(null), 3000);
  };

  const userInitials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-50 rounded-full -ml-24 -mb-24 blur-3xl opacity-50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-2xl shadow-blue-200">
              {userInitials}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
               <div className="bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{userName}</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full border border-blue-100">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Terverifikasi
              </span>
            </div>
            <p className="text-slate-500 font-medium">{userEmail}</p>
            <p className="text-slate-400 text-sm font-medium">Perawat Profesional sejak Januari 2024</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">STR:</span>
                <span className="text-xs font-bold text-slate-700">8921-XXXX-2129</span>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Unit:</span>
                <span className="text-xs font-bold text-slate-700">ICU / Gawat Darurat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Askep Dibuat', value: stats.askep, color: 'text-blue-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
          { label: 'Quiz Selesai', value: stats.quiz, color: 'text-purple-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
          { label: 'SBAR Report', value: stats.sbar, color: 'text-teal-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg> },
          { label: 'Kompetensi', value: 'High', color: 'text-indigo-600', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"/></svg> }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-2 group hover:border-blue-300 transition-all cursor-default">
            <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Strength Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-lg font-bold">Kekuatan Profil</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin duration-[3s] flex items-center justify-center">
                   <span className="font-black text-xs">85%</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Profil Anda hampir lengkap! Tambahkan foto profil untuk mencapai 100%.</p>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold transition-all">Lengkapi Sekarang</button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Aktivitas Terakhir
            </h3>
            <div className="space-y-4">
              {[
                { task: 'Diagnosis SDKI Baru', time: '2 jam lalu', icon: '📝' },
                { task: 'Latihan Quiz KMB', time: 'Kemarin', icon: '🎯' },
                { task: 'Perhitungan Dosis', time: '2 hari lalu', icon: '➗' }
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-sm grayscale group-hover:grayscale-0 transition-all">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">{activity.task}</p>
                    <p className="text-[10px] text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
            <div className="flex justify-between items-center border-b border-slate-50 pb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Informasi Pengguna</h3>
                <p className="text-xs text-slate-400 mt-1">Kelola data dasar identitas Anda dalam aplikasi.</p>
              </div>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Edit Data
                </button>
              )}
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nama Lengkap</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Profesional</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700 disabled:opacity-60"
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex gap-3 justify-end pt-4 animate-in slide-in-from-right-4 duration-300">
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(false); setName(userName); setEmail(userEmail); }}
                    className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Batalkan
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Security Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-50 pb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Keamanan & Privasi
              </h3>
              <p className="text-xs text-slate-400 mt-1">Kami menggunakan enkripsi end-to-end untuk melindungi password Anda.</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Password Saat Ini</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                  />
                  <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Password Baru</label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min. 6 karakter"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                  />
                </div>
              </div>

              {passMessage && (
                <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 animate-in zoom-in duration-300 ${
                  passMessage.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${passMessage.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {passMessage.type === 'success' ? '✓' : '!'}
                  </div>
                  {passMessage.text}
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-[0.98]"
                >
                  Perbarui Keamanan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
