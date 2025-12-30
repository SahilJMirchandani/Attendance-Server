
import React from 'react';
import { AttendanceRecord, Lecture, View } from '../types';

interface AnalyticsProps {
  attendance: AttendanceRecord[];
  timetable: Lecture[];
  setView: (v: View) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ attendance, timetable, setView }) => {
  const subjects = Array.from(new Set(timetable.map(l => l.name)));

  return (
    <div className="h-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-sky-600 font-bold hover:translate-x-[-4px] transition-transform">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <h2 className="text-4xl font-black text-slate-900 mb-2">Detailed Analytics</h2>
        <p className="text-slate-500 mb-10 font-medium">Your academic journey, visualized in data.</p>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
          <h3 className="font-bold text-slate-900 mb-6">Attendance Trend</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[45, 67, 89, 75, 92, 80, 85].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className="bg-sky-200 hover:bg-sky-500 transition-all rounded-t-lg w-full" 
                  style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Subject</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Total Lectures</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Attended</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map(sub => {
                const perc = Math.floor(Math.random() * 30) + 70; // Mock data
                return (
                  <tr key={sub} className="hover:bg-sky-50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-900">{sub}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">45</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{Math.floor(45 * (perc/100))}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${perc >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {perc}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
