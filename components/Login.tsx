
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password' | 'verification-sent' | 'reset-sent';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoading(true);
      setError(null);
      // Simulate API call
      setTimeout(() => {
        onLogin(email);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password tidak cocok.');
      return;
    }
    setIsLoading(true);
    setError(null);
    // Simulate API call for registration
    setTimeout(() => {
      setIsLoading(false);
      setView('verification-sent');
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Masukkan email Anda.');
      return;
    }
    setIsLoading(true);
    setError(null);
    // Simulate API call for password reset
    setTimeout(() => {
      setIsLoading(false);
      setView('reset-sent');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google Auth
    setTimeout(() => {
      onLogin('nurse.expert@gmail.com');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-teal-100 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 mb-6 group transition-transform hover:scale-105 cursor-pointer" onClick={() => setView('login')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">NursePro</h1>
          <p className="text-slate-500 font-medium mt-2">Digital Assistant for Modern Nursing</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
          {view === 'login' && (
            <div className="animate-in fade-in duration-300">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] mb-6 shadow-sm disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M19.6 10.23c0-.65-.06-1.27-.16-1.87h-9.21v3.54h5.26c-.23 1.2-.91 2.21-1.92 2.88v2.4h3.11c1.82-1.68 2.87-4.15 2.87-6.95z" fill="#4285F4"/>
                  <path d="M10.23 19.77c2.64 0 4.86-.87 6.47-2.37l-3.11-2.4c-.86.58-1.96.93-3.36.93-2.58 0-4.77-1.74-5.55-4.08H1.47v2.48c1.61 3.2 4.93 5.44 8.76 5.44z" fill="#34A853"/>
                  <path d="M4.68 11.85c-.2-.58-.31-1.2-.31-1.85s.11-1.27.31-1.85V5.67H1.47c-.67 1.34-1.05 2.85-1.05 4.33s.38 2.99 1.05 4.33l3.21-2.48z" fill="#FBBC05"/>
                  <path d="M10.23 3.7c1.44 0 2.73.5 3.75 1.47l2.81-2.81C15.08.87 12.87 0 10.23 0 6.4 0 3.08 2.24 1.47 5.44l3.21 2.48c.78-2.34 2.97-4.22 5.55-4.22z" fill="#EA4335"/>
                </svg>
                Lanjutkan dengan Google
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-slate-100 flex-1"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Atau Email</span>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                    <button type="button" onClick={() => setView('forgot-password')} className="text-[10px] font-bold text-blue-600 hover:text-blue-700">Lupa Password?</button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                
                {error && <p className="text-xs font-bold text-red-500 text-center animate-pulse">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Masuk ke Dashboard'}
                </button>
              </form>
              <div className="mt-8 text-center border-t border-slate-50 pt-6">
                <p className="text-xs text-slate-500 font-medium">
                  Belum punya akun? <button onClick={() => {setView('signup'); setError(null);}} className="text-blue-600 font-bold hover:underline">Daftar Sekarang</button>
                </p>
              </div>
            </div>
          )}

          {view === 'signup' && (
            <div className="animate-in slide-in-from-right duration-300">
              <h2 className="text-2xl font-black text-slate-800 mb-2">Daftar Akun</h2>
              <p className="text-sm text-slate-500 mb-6">Lengkapi data untuk mengaktifkan asisten digital Anda.</p>
              
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ns. Nama Lengkap"
                    className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Pribadi</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Konfirmasi</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                    />
                  </div>
                </div>

                {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Mendaftarkan...' : 'Buat Akun Sekarang'}
                </button>
              </form>
              
              <button onClick={() => setView('login')} className="w-full mt-6 text-sm font-bold text-slate-400 hover:text-slate-600">
                Sudah punya akun? Masuk
              </button>
            </div>
          )}

          {view === 'forgot-password' && (
            <div className="animate-in slide-in-from-right duration-300">
              <h2 className="text-2xl font-black text-slate-800 mb-2">Lupa Password</h2>
              <p className="text-sm text-slate-500 mb-6">Masukkan email Anda untuk menerima instruksi reset password.</p>
              
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Terdaftar</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
                  />
                </div>

                {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                </button>
              </form>
              
              <button onClick={() => {setView('login'); setError(null);}} className="w-full mt-8 text-sm font-bold text-slate-400 hover:text-slate-600">
                Kembali ke Login
              </button>
            </div>
          )}

          {view === 'verification-sent' && (
            <div className="text-center py-4 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Verifikasi Email Dikirim</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Kami telah mengirimkan tautan aktivasi ke <span className="font-bold text-slate-800">{email}</span>. Silakan periksa kotak masuk dan klik tautan tersebut untuk mulai menggunakan NursePro.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setView('login')}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all"
                >
                  Kembali ke Login
                </button>
                <button className="text-xs font-bold text-blue-600 hover:underline">Kirim ulang email verifikasi</button>
              </div>
            </div>
          )}

          {view === 'reset-sent' && (
            <div className="text-center py-4 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Link Reset Dikirim</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Konfirmasi permintaan reset password telah dikirim ke <span className="font-bold text-slate-800">{email}</span>. Klik link di dalam email tersebut untuk membuat password baru.
              </p>
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-8">
                <p className="text-[10px] text-amber-700 font-medium italic">
                  Tidak menerima email? Periksa folder Spam atau tunggu beberapa menit.
                </p>
              </div>
              <button 
                onClick={() => setView('login')}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all"
              >
                Sudah Ganti? Login
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
           <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Server Terenkripsi
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  ISO 27001 Ready
              </div>
           </div>
           <p className="text-[10px] text-slate-400 text-center px-8 leading-relaxed">
             Dengan menggunakan NursePro, Anda setuju untuk menjaga kerahasiaan data pasien sesuai dengan Undang-Undang Perlindungan Data Pribadi (UU PDP).
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
