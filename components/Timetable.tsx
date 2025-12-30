
import React, { useState } from 'react';
import { View, Lecture } from '../types';
import { parseTimetable } from '../services/geminiService';

interface TimetableProps {
  timetable: Lecture[];
  setTimetable: (t: Lecture[]) => void;
  setView: (v: View) => void;
}

const TimetableComponent: React.FC<TimetableProps> = ({ timetable, setTimetable, setView }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const lectures = await parseTimetable(base64, file.type);
        setTimetable(lectures);
        localStorage.setItem('as_timetable', JSON.stringify(lectures));
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to parse timetable. Please try a clearer image.');
      setLoading(false);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="h-full bg-slate-50 overflow-y-auto p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => setView('dashboard')} className="mb-4 flex items-center text-sky-600 font-bold text-sm hover:translate-x-[-4px] transition-transform">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              Back to Dashboard
            </button>
            <h2 className="text-3xl font-black text-slate-900">Your Timetable</h2>
            <p className="text-slate-500">Upload your schedule and let AI handle the rest.</p>
          </div>
          
          <label className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-sky-100 cursor-pointer flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <span>{loading ? 'Parsing AI...' : 'Upload Image/Excel'}</span>
            <input type="file" className="hidden" accept="image/*,.xlsx,.xls" onChange={handleFileUpload} disabled={loading} />
          </label>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 border border-red-100 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sky-900 font-bold">AI is understanding your schedule...</p>
          </div>
        ) : timetable.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {days.map(day => (
              <div key={day} className="space-y-4">
                <h3 className="font-black text-sky-900 text-lg border-b-2 border-sky-100 pb-2">{day}</h3>
                <div className="space-y-3">
                  {timetable.filter(l => l.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime)).map((lecture, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-sky-200 transition-colors">
                      <p className="text-[10px] font-bold text-sky-500 uppercase tracking-wider">{lecture.startTime} - {lecture.endTime}</p>
                      <h4 className="font-bold text-slate-900 mt-1">{lecture.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{lecture.professor}</p>
                    </div>
                  ))}
                  {timetable.filter(l => l.day === day).length === 0 && (
                    <p className="text-xs text-slate-400 italic">No lectures</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Upload your first timetable</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Just snap a photo of your schedule or upload an excel sheet to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableComponent;
