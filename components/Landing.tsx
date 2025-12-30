
import React, { useState } from 'react';

interface LandingProps {
  onComplete: () => void;
}

const Landing: React.FC<LandingProps> = ({ onComplete }) => {
  const [isSwiping, setIsSwiping] = useState(false);

  const handleSwipe = () => {
    setIsSwiping(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-sky-50 transition-all duration-700 z-50 ${isSwiping ? 'swipe-animation' : ''}`}
      onClick={handleSwipe}
    >
      <div className="max-w-md text-center px-6">
        <h2 className="text-sky-800 font-bold text-lg mb-2 tracking-widest uppercase">Syntax Society</h2>
        <h1 className="text-5xl font-extrabold text-sky-900 mb-8 leading-tight">Attendance Saver</h1>
        
        <div className="relative mb-12 flex justify-center">
          <div className="w-64 h-64 bg-sky-200 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/student_phone/400/400" 
              alt="Student using phone" 
              className="object-cover w-full h-full opacity-90"
            />
          </div>
          <div className="absolute -bottom-4 right-1/4 bg-white p-3 rounded-2xl shadow-lg border border-sky-100 flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-sky-900 italic">Managing attendance...</span>
          </div>
        </div>

        <p className="text-sky-600 font-medium mb-12">Effortless Tracking, Smarter Decisions.</p>
        
        <button 
          onClick={handleSwipe}
          className="group flex flex-col items-center space-y-2 cursor-pointer animate-bounce"
        >
          <span className="text-sky-400 font-bold text-xs uppercase tracking-[0.2em]">Swipe up to start</span>
          <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Landing;
