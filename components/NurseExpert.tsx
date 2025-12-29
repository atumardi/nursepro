
import React, { useState, useEffect, useRef } from 'react';
import { generateQuizQuestions, processQuizDocument } from '../services/geminiService';
import { QuizQuestion, Article, QuizSet, QuizHistory, AppUser } from '../types';

interface NurseExpertProps {
  userRole: 'admin' | 'user';
}

const NurseExpert: React.FC<NurseExpertProps> = ({ userRole }) => {
  type ExpertView = 'practice' | 'library' | 'bank' | 'history' | 'users';
  const [view, setView] = useState<ExpertView>('practice');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fix: Explicitly cast id to ExpertView to prevent string widening and fix type incompatibility error on line 16.
  const menuOptions: { id: ExpertView; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    { 
      id: 'practice' as ExpertView, 
      label: 'Pusat Ujian', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> 
    },
    { 
      id: 'bank' as ExpertView, 
      label: userRole === 'admin' ? 'Kelola Bank Soal' : 'Koleksi Soal', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg> 
    },
    { 
      id: 'history' as ExpertView, 
      label: 'Riwayat Skor', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> 
    },
    { 
      id: 'library' as ExpertView, 
      label: 'Materi Kuliah', 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg> 
    },
    {
      id: 'users' as ExpertView,
      label: 'Manajemen Akses',
      adminOnly: true,
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    }
  ].filter(opt => !opt.adminOnly || userRole === 'admin');

  const currentOption = menuOptions.find(opt => opt.id === view) || menuOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Nurse Expert</h2>
             {userRole === 'admin' ? (
               <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-red-100 tracking-widest">Administrator</span>
             ) : (
               <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-100 tracking-widest">Peserta Didik</span>
             )}
          </div>
          <p className="text-slate-500 text-sm font-medium">Platform evaluasi kompetensi keperawatan terintegrasi.</p>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-3 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl shadow-sm hover:border-blue-300 transition-all min-w-[240px] w-full md:w-auto"
          >
            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                {currentOption?.icon}
              </div>
              <span className="font-bold text-slate-700">{currentOption?.label}</span>
            </div>
            <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-full md:w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/40 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-2 space-y-1">
                {menuOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setView(option.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      view === option.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:pl-5'
                    }`}
                  >
                    <div className={view === option.id ? 'text-blue-600' : 'text-slate-400'}>
                      {option.icon}
                    </div>
                    <span className="font-bold text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="min-h-[400px]">
        {view === 'practice' && <PracticeSection userRole={userRole} onGoToBank={() => setView('bank')} />}
        {view === 'bank' && <BankSoalSection userRole={userRole} />}
        {view === 'history' && <HistorySection />}
        {view === 'library' && <LibrarySection />}
        {view === 'users' && userRole === 'admin' && <UsersSection />}
      </div>
    </div>
  );
};

const UsersSection = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const currentUserEmail = localStorage.getItem('nurse_pro_email');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nurse_pro_users') || '[]');
    setUsers(saved);
  }, []);

  const toggleRole = (email: string) => {
    const updated = users.map(u => {
      if (u.email === email) {
        return { ...u, role: u.role === 'admin' ? 'user' : 'admin' } as AppUser;
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('nurse_pro_users', JSON.stringify(updated));
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl font-black text-slate-800">Manajemen Pengguna</h3>
        <p className="text-sm text-slate-500 mt-1">Kelola hak akses dan peran administrator untuk seluruh pengguna NursePro.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th className="px-8 py-4">Pengguna</th>
              <th className="px-8 py-4">Email</th>
              <th className="px-8 py-4">Role / Izin</th>
              <th className="px-8 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u.email} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-700">{u.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-slate-500">{u.email}</td>
                <td className="px-8 py-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    u.role === 'admin' 
                      ? 'bg-red-50 text-red-600 border-red-100' 
                      : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {u.role === 'admin' ? 'Administrator' : 'Perawat (User)'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  {u.email !== currentUserEmail && (
                    <button 
                      onClick={() => toggleRole(u.email)}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-all shadow-sm"
                    >
                      Ubah Peran
                    </button>
                  )}
                  {u.email === currentUserEmail && (
                    <span className="text-[10px] font-bold text-slate-300 italic uppercase">Akun Anda</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PracticeSection = ({ userRole, onGoToBank }: { userRole: 'admin' | 'user', onGoToBank: () => void }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (questions.length > 0 && !quizFinished && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setQuizFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [questions, quizFinished, timeLeft]);

  const startQuiz = (qs: QuizQuestion[], quizTitle: string) => {
    setQuestions(qs);
    setTopic(quizTitle);
    setCurrentIdx(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(qs.length * 60);
  };

  const handleGenerateFromTopic = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const qs = await generateQuizQuestions(topic);
      startQuiz(qs, topic);
    } catch (error) {
      console.error("Quiz generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartRandomExam = () => {
    const saved = JSON.parse(localStorage.getItem('nurse_quiz_sets') || '[]');
    if (saved.length === 0) {
      alert("Belum ada bank soal tersedia. Hubungi admin untuk mengunggah soal.");
      return;
    }
    const randomSet = saved[Math.floor(Math.random() * saved.length)];
    startQuiz(randomSet.questions, randomSet.title);
  };

  const handleAnswerSelection = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
      saveResult();
    }
  };

  const saveResult = () => {
    const history: QuizHistory = {
      id: Date.now().toString(),
      title: topic || 'Ujian Kompetensi',
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      completedAt: Date.now()
    };
    const saved = JSON.parse(localStorage.getItem('nurse_quiz_history') || '[]');
    localStorage.setItem('nurse_quiz_history', JSON.stringify([history, ...saved]));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-200">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="font-bold text-slate-800">Menyusun Soal Berkualitas...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 text-center space-y-8 animate-in zoom-in duration-500 max-w-2xl mx-auto shadow-xl">
        <div className="w-32 h-32 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl font-black border-4 border-blue-100">
          {Math.round((score / questions.length) * 100)}%
        </div>
        <div>
          <h3 className="text-3xl font-black text-slate-800">Hasil Evaluasi</h3>
          <p className="text-slate-500 mt-2 font-medium">Anda berhasil menjawab {score} dari {questions.length} soal dengan benar.</p>
        </div>
        <div className="flex gap-4 justify-center">
           <button onClick={() => setQuestions([])} className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">Kembali</button>
           <button onClick={() => setQuestions([])} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Selesai</button>
        </div>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIdx];
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 uppercase tracking-wider">SOAL {currentIdx + 1}/{questions.length}</span>
            <h4 className="font-bold text-slate-400 text-xs uppercase hidden sm:block">{topic}</h4>
          </div>
          <div className="font-bold text-slate-700 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="font-mono">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">{q.question}</h3>
          <div className="grid gap-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswerSelection(i)}
                disabled={selectedAnswer !== null}
                className={`p-6 rounded-2xl text-left font-semibold transition-all flex items-center gap-4 border-2 ${
                  selectedAnswer === null 
                    ? 'border-slate-100 hover:border-blue-400 hover:bg-blue-50/50' 
                    : i === q.correctAnswer 
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-sm shadow-green-100' 
                      : i === selectedAnswer 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-slate-100 opacity-50'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border transition-colors ${
                    selectedAnswer === null ? 'bg-white border-slate-200' : i === q.correctAnswer ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
                }`}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-3">
                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                 </div>
                 Pembahasan Klinis
               </div>
               <p className="text-sm text-blue-700 leading-relaxed font-medium">{q.explanation}</p>
               <button onClick={handleNext} className="mt-8 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all transform active:scale-[0.98]">
                 Lanjut ke Soal Berikutnya
               </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between group hover:border-blue-300 transition-all">
        <div className="space-y-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Generate via Topik</h3>
            <p className="text-sm text-slate-400 font-medium">Buat latihan soal spesifik berdasarkan topik yang Anda inginkan menggunakan kecerdasan AI.</p>
            </div>
            <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: Keperawatan Gawat Darurat" 
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-700"
            />
        </div>
        <button onClick={handleGenerateFromTopic} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">Hasilkan Soal AI</button>
      </div>

      <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
        <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/5">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div>
            <h3 className="text-2xl font-black text-white mb-2">Simulasi Ujian</h3>
            <p className="text-sm text-slate-400 font-medium">Gunakan kumpulan soal resmi yang telah diunggah oleh Admin untuk simulasi ujian kompetensi.</p>
            </div>
        </div>
        <button onClick={handleStartRandomExam} className="relative z-10 w-full bg-white text-slate-900 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-50 transition-all">Mulai Simulasi Ujian</button>
      </div>
    </div>
  );
};

const BankSoalSection = ({ userRole }: { userRole: 'admin' | 'user' }) => {
  const [sets, setSets] = useState<QuizSet[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = () => {
    const saved = JSON.parse(localStorage.getItem('nurse_quiz_sets') || '[]');
    setSets(saved);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const extractedQuestions = await processQuizDocument(base64, file.type);
        
        if (extractedQuestions && extractedQuestions.length > 0) {
            const newSet: QuizSet = {
                id: Date.now().toString(),
                title: file.name.replace(/\.[^/.]+$/, ""),
                sourceType: 'document',
                createdAt: Date.now(),
                questions: extractedQuestions
            };
            const saved = JSON.parse(localStorage.getItem('nurse_quiz_sets') || '[]');
            const updated = [newSet, ...saved];
            localStorage.setItem('nurse_quiz_sets', JSON.stringify(updated));
            setSets(updated);
            alert(`Berhasil mengekstrak ${extractedQuestions.length} soal.`);
        } else {
            alert("Gagal mengekstrak soal dari dokumen.");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("File processing error", error);
      alert("Terjadi kesalahan saat memproses dokumen.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteSet = (id: string) => {
    if (!confirm("Hapus bank soal ini secara permanen?")) return;
    const updated = sets.filter(s => s.id !== id);
    localStorage.setItem('nurse_quiz_sets', JSON.stringify(updated));
    setSets(updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-black text-slate-800">Database Bank Soal</h3>
        {userRole === 'admin' && (
            <div className="flex gap-2 w-full sm:w-auto">
                <input 
                    type="file" 
                    hidden 
                    ref={fileInputRef} 
                    onChange={handleFileUpload}
                    accept=".pdf,.png,.jpg,.jpeg,.docx"
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    )}
                    Upload Dokumen Soal
                </button>
            </div>
        )}
      </div>

      {loading && (
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem] flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="text-center">
                <p className="font-black text-blue-700">Menganalisis Dokumen...</p>
                <p className="text-xs text-blue-500 font-medium">Gemini AI sedang mengekstrak pertanyaan medis dari file Anda.</p>
              </div>
          </div>
      )}

      {sets.length === 0 && !loading ? (
        <div className="py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
          <p className="text-slate-400 font-bold">Belum ada bank soal tersedia.</p>
          <p className="text-xs text-slate-400 mt-1">Admin perlu mengunggah materi ujian terlebih dahulu.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets.map((set) => (
            <div key={set.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 hover:border-blue-400 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                        {set.questions.length} Soal
                    </span>
                    {userRole === 'admin' && (
                        <button onClick={() => deleteSet(set.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    )}
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{set.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mb-6">Diverifikasi: {new Date(set.createdAt).toLocaleDateString()}</p>
              </div>
              <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Lihat Detail</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HistorySection = () => {
  const [history, setHistory] = useState<QuizHistory[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nurse_quiz_history') || '[]');
    setHistory(saved);
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xl font-black text-slate-800 mb-6 px-2">Progress Belajar Anda</h3>
      {history.length === 0 ? (
        <div className="py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
          <p className="text-slate-400 font-bold italic">Belum ada riwayat ujian yang tersimpan.</p>
        </div>
      ) : (
        history.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black ${item.percentage >= 80 ? 'bg-green-50 text-green-600 border border-green-100' : item.percentage >= 60 ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                <span className="text-2xl leading-none">{item.percentage}%</span>
                <span className="text-[8px] uppercase tracking-tighter mt-1">TOTAL</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(item.completedAt).toLocaleDateString()}</p>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{item.score} / {item.total} BENAR</p>
                </div>
              </div>
            </div>
            <button className="w-10 h-10 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const LibrarySection = () => {
  const articles: Article[] = [
    { id: 1, title: 'Interpretasi EKG Dasar untuk Perawat', author: 'Ns. Ahmad', category: 'Kardiologi', summary: 'Belajar membaca gelombang EKG normal dan tanda-tanda iskemia jantung secara sistematis.', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&q=80' },
    { id: 2, title: 'Manajemen Syok Anafilaktik di IGD', author: 'Ns. Siska', category: 'Emergency', summary: 'Protokol terbaru penanganan anafilaksis dan penggunaan epinefrin yang tepat.', thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop&q=80' },
    { id: 3, title: 'Etika Keperawatan dalam Rekam Medis Digital', author: 'Ns. Budi', category: 'Etik', summary: 'Panduan menjaga privasi data pasien dan integritas data di era digitalisasi rumah sakit.', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&q=80' }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {articles.map((art) => (
        <div key={art.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          <div className="relative h-48 overflow-hidden">
            <img src={art.thumbnail} alt={art.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            <div className="absolute top-4 left-4">
                <span className="text-[8px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg">{art.category}</span>
            </div>
          </div>
          <div className="p-8 space-y-4">
            <h4 className="font-bold text-slate-800 text-lg line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{art.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-medium">{art.summary}</p>
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">Oleh: {art.author}</span>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Pelajari →</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NurseExpert;
