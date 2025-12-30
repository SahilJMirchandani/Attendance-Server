
import React, { useState } from 'react';
import { View } from '../types';

interface NotificationProps {
  setView: (v: View) => void;
}

const Notifications: React.FC<NotificationProps> = ({ setView }) => {
  const [enabled, setEnabled] = useState(false);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') setEnabled(true);
  };

  return (
    <div className="h-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-sky-600 font-bold hover:translate-x-[-4px] transition-transform">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 text-center mb-2">Smart Alerts</h2>
          <p className="text-slate-500 text-center mb-10 font-medium">Never miss a lecture or drop below 75% again.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900">Attendance Alerts</h4>
                <p className="text-xs text-slate-500">Notify me if attendance drops below 75%</p>
              </div>
              <button 
                onClick={() => setEnabled(!enabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-sky-500' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${enabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900">Lecture Reminders</h4>
                <p className="text-xs text-slate-500">10 mins before lecture starts</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-sky-500 relative">
                <div className="absolute top-1 left-7 bg-white w-4 h-4 rounded-full"></div>
              </button>
            </div>
          </div>

          <button 
            onClick={requestPermission}
            className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-colors"
          >
            Enable Browser Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
