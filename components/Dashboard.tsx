
import React, { useState, useEffect } from 'react';
import { User, View, Lecture, AttendanceRecord } from '../types';
import AttendanceTracker from './AttendanceTracker';

interface DashboardProps {
  user: User;
  timetable: Lecture[];
  attendance: AttendanceRecord[];
  setView: (v: View) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, timetable, attendance, setView, onLogout }) => {
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    // Basic logic to find ongoing lecture based on current time
    const checkLecture = () => {
      const now = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = dayNames[now.getDay()];
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const found = timetable.find(l => 
        l.day === currentDay && 
        currentTimeStr >= l.startTime && 
        currentTimeStr <= l.endTime
      );
      setCurrentLecture(found || null);
    };

    checkLecture();
    const interval = setInterval(checkLecture, 30000);
    return () => clearInterval(interval);
  }, [timetable]);

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-sky-900 tracking-tight">Attendance Saver</h1>
          <p className="text-[10px] text-sky-400 font-bold tracking-widest uppercase mt-1">Syntax Society</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => setView('dashboard')} className="w-full flex items-center space-x-3 p-3 bg-sky-50 text-sky-700 rounded-xl font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span>Home</span>
          </button>
          <button onClick={() => setView('timetable')} className="w-full flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 hover:text-sky-600 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>Timetable</span>
          </button>
          <button onClick={() => setView('recognition')} className="w-full flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 hover:text-sky-600 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            <span>Face Registration</span>
          </button>
          <button onClick={() => setView('analytics')} className="w-full flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 hover:text-sky-600 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span>Analytics</span>
          </button>
          <button onClick={() => setView('bunk')} className="w-full flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 hover:text-sky-600 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Bunk Calculator</span>
          </button>
          <button onClick={() => setView('notifications')} className="w-full flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 hover:text-sky-600 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span>Notifications</span>
          </button>
          <button onClick={() => setView('about')} className="w-full flex items-center space-x-3 p-3 text-slate-500 hover:bg-slate-50 hover:text-sky-600 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>About Us</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-3">
          <button 
            onClick={() => setView('profile')}
            className="flex items-center space-x-3 w-full p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-sky-100 overflow-hidden flex-shrink-0">
              <img src={user.photoUrl || "https://picsum.photos/seed/user/100/100"} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </button>
          <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Hello, {user.name}! 👋</h2>
          <p className="text-slate-500 italic mt-1 font-medium">Your peace of mind starts with good attendance.</p>
        </header>

        {/* Real-time Status */}
        {currentLecture ? (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-sky-100 mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider animate-pulse">Ongoing</span>
                <span className="text-slate-400 text-sm font-medium">{new Date().toDateString()}</span>
              </div>
              <h3 className="text-3xl font-bold text-sky-900 mb-1">{currentLecture.name}</h3>
              <p className="text-slate-600 font-medium mb-6">with Prof. {currentLecture.professor} • {currentLecture.startTime} - {currentLecture.endTime}</p>
              
              <AttendanceTracker user={user} lecture={currentLecture} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center mb-8">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">No active lectures right now</h3>
            <p className="text-slate-500">Take a deep breath and relax. Check your timetable for the next session.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setView('analytics')}>
            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
              Overall Attendance
              <span className="text-sky-600 text-sm">View Details</span>
            </h4>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-sky-900">82%</span>
              <div className="w-full max-w-[120px] bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setView('bunk')}>
            <h4 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
              Bunk Status
              <span className="text-sky-600 text-sm">Calculate</span>
            </h4>
            <p className="text-slate-600 text-sm mb-2">You can miss <span className="text-sky-700 font-bold">2 more lectures</span> of Math without dropping below 75%.</p>
          </div>

          {!user.faceRegistered && (
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 animate-pulse cursor-pointer" onClick={() => setView('recognition')}>
              <h4 className="font-bold text-amber-900 mb-1">Action Required</h4>
              <p className="text-amber-700 text-sm">Face not registered. Automatic attendance will not work.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
