
import React, { useState } from 'react';
import { AttendanceRecord, Lecture, View } from '../types';

interface BunkProps {
  attendance: AttendanceRecord[];
  timetable: Lecture[];
  setView: (v: View) => void;
}

const BunkCalculator: React.FC<BunkProps> = ({ attendance, timetable, setView }) => {
  // Aggregate unique subjects
  const subjects = Array.from(new Set(timetable.map(l => l.name)));
  
  const calculateBunks = (subject: string) => {
    const totalLecturesInSchedule = timetable.filter(l => l.name === subject).length;
    // For demo, assume current semester is 10 weeks in
    const totalSoFar = totalLecturesInSchedule * 10;
    const attended = Math.floor(totalSoFar * (0.6 + Math.random() * 0.4)); // Mock attended data
    
    // Formula: (Attended / (TotalSoFar + X)) >= 0.75
    // Attended >= 0.75 * (TotalSoFar + X)
    // Attended / 0.75 >= TotalSoFar + X
    // X = (Attended / 0.75) - TotalSoFar
    
    const requiredToMaintain = Math.ceil(attended / 0.75) - totalSoFar;
    const canBunk = Math.max(0, Math.floor((attended - 0.75 * totalSoFar) / 0.75));

    return { attended, totalSoFar, canBunk, percentage: Math.round((attended / totalSoFar) * 100) };
  };

  return (
    <div className="h-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-sky-600 font-bold hover:translate-x-[-4px] transition-transform">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <h2 className="text-4xl font-black text-slate-900 mb-2">Bunk Calculator</h2>
        <p className="text-slate-500 mb-10 font-medium">Strategic planning for your freedom, maintaining 75% safely.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Explicitly typing 'sub' as string to fix 'unknown' type error in calculateBunks and React node rendering */}
          {subjects.map((sub: string) => {
            const stats = calculateBunks(sub);
            return (
              <div key={sub} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-sky-900 text-xl">{sub}</h3>
                  <span className={`text-lg font-black ${stats.percentage >= 75 ? 'text-green-500' : 'text-red-500'}`}>
                    {stats.percentage}%
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold text-slate-400">
                    <span>Attendance Status</span>
                    <span>{stats.attended}/{stats.totalSoFar}</span>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl border border-sky-50">
                    <p className="text-slate-600 text-sm font-medium">
                      You can bunk <span className="text-sky-600 font-black text-lg">{stats.canBunk}</span> more lectures safely.
                    </p>
                  </div>

                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${stats.percentage >= 75 ? 'bg-sky-500' : 'bg-red-400'}`} style={{ width: `${stats.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}

          {subjects.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-slate-100">
               <p className="text-slate-400 italic">No subjects found. Upload a timetable first.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BunkCalculator;
