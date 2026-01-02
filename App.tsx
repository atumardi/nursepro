
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import QuickAskep from './components/QuickAskep';
import NurseCalc from './components/NurseCalc';
import NurseExpert from './components/NurseExpert';
import ShiftHandover from './components/ShiftHandover';
import UserProfile from './components/UserProfile';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import ClinicalVision from './components/ClinicalVision';
import Login from './components/Login';
import { NavigationTab, AppUser } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('askep');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('nurse_pro_email');
    if (savedEmail) {
      const users: AppUser[] = JSON.parse(localStorage.getItem('nurse_pro_users') || '[]');
      const user = users.find(u => u.email === savedEmail);
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogin = (email: string) => {
    const users: AppUser[] = JSON.parse(localStorage.getItem('nurse_pro_users') || '[]');
    let user = users.find(u => u.email === email);

    if (!user) {
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      const role: 'admin' | 'user' = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      
      user = {
        name: formattedName,
        email: email,
        role: role,
        lastLogin: Date.now()
      };
      users.push(user);
      localStorage.setItem('nurse_pro_users', JSON.stringify(users));
    } else {
      user.lastLogin = Date.now();
      localStorage.setItem('nurse_pro_users', JSON.stringify(users));
    }

    localStorage.setItem('nurse_pro_email', email);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('nurse_pro_email');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleUpdateProfile = (name: string, email: string) => {
    const users: AppUser[] = JSON.parse(localStorage.getItem('nurse_pro_users') || '[]');
    const updatedUsers = users.map(u => 
      u.email === currentUser?.email ? { ...u, name, email } : u
    );
    localStorage.setItem('nurse_pro_users', JSON.stringify(updatedUsers));
    localStorage.setItem('nurse_pro_email', email);
    
    const user = updatedUsers.find(u => u.email === email);
    if (user) setCurrentUser(user);
  };

  if (!isLoggedIn || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'askep':
        return <QuickAskep />;
      case 'sbar':
        return <ShiftHandover />;
      case 'calc':
        return <NurseCalc />;
      case 'expert':
        return <NurseExpert userRole={currentUser.role} />;
      case 'profile':
        return <UserProfile userName={currentUser.name} userEmail={currentUser.email} onUpdateProfile={handleUpdateProfile} />;
      case 'about':
        return <AboutUs onNavigateToPrivacy={() => setActiveTab('privacy')} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'vision':
        return <ClinicalVision />;
      default:
        return <QuickAskep />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userName={currentUser.name}
      onLogout={handleLogout}
    >
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
