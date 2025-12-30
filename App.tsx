
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import TimetableComponent from './components/Timetable';
import FaceRegistration from './components/FaceRegistration';
import Analytics from './components/Analytics';
import BunkCalculator from './components/BunkCalculator';
import Notifications from './components/Notifications';
import About from './components/About';
import { User, View, Lecture, AttendanceRecord } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [timetable, setTimetable] = useState<Lecture[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  // Persist state
  useEffect(() => {
    const savedUser = localStorage.getItem('as_user');
    const savedTimetable = localStorage.getItem('as_timetable');
    const savedAttendance = localStorage.getItem('as_attendance');

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // If user exists, don't show landing every time, maybe? 
      // But user requested "1st when user clicks link a page should appear..."
    }
    if (savedTimetable) setTimetable(JSON.parse(savedTimetable));
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('as_user', JSON.stringify(u));
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('as_user');
    setView('auth');
  };

  const renderView = () => {
    switch (view) {
      case 'landing':
        return <Landing onComplete={() => setView(user ? 'dashboard' : 'auth')} />;
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard user={user!} timetable={timetable} attendance={attendance} setView={setView} onLogout={handleLogout} />;
      case 'profile':
        return <Profile user={user!} setUser={setUser} setView={setView} />;
      case 'timetable':
        return <TimetableComponent timetable={timetable} setTimetable={setTimetable} setView={setView} />;
      case 'recognition':
        return <FaceRegistration user={user!} setUser={setUser} setView={setView} />;
      case 'analytics':
        return <Analytics attendance={attendance} timetable={timetable} setView={setView} />;
      case 'bunk':
        return <BunkCalculator attendance={attendance} timetable={timetable} setView={setView} />;
      case 'notifications':
        return <Notifications setView={setView} />;
      case 'about':
        return <About setView={setView} />;
      default:
        return <Dashboard user={user!} timetable={timetable} attendance={attendance} setView={setView} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {renderView()}
    </div>
  );
};

export default App;
