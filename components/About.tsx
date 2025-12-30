
import React from 'react';
import { View } from '../types';

interface AboutProps {
  setView: (v: View) => void;
}

const About: React.FC<AboutProps> = ({ setView }) => {
  return (
    <div className="h-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-sky-600 font-bold hover:translate-x-[-4px] transition-transform">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <h1 className="text-sky-900 font-black text-4xl opacity-10">SYNTAX SOCIETY</h1>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Attendance Saver</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-12 font-medium">
              Attendance Saver is a cutting-edge solution designed by <span className="text-sky-600 font-bold underline decoration-sky-200 decoration-4">Syntax Society</span> to eliminate the manual burden of attendance tracking. 
              By combining AI-driven timetable intelligence and high-precision face recognition hardware, we ensure that students can focus on what matters most: <span className="italic">learning</span>.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-sky-600 pl-4">The Team</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-slate-50 p-8 rounded-3xl hover:bg-sky-50 transition-colors border border-transparent hover:border-sky-100">
                <div className="w-20 h-20 bg-sky-200 rounded-full mb-6 overflow-hidden">
                  <img src="https://picsum.photos/seed/dev1/200/200" alt="Founder 1" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Developer One</h4>
                <p className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4">Lead Architect</p>
                <p className="text-slate-500 text-sm font-medium">Specialist in AI systems and computer vision logic.</p>
              </div>

              <div className="group bg-slate-50 p-8 rounded-3xl hover:bg-sky-50 transition-colors border border-transparent hover:border-sky-100">
                <div className="w-20 h-20 bg-sky-200 rounded-full mb-6 overflow-hidden">
                  <img src="https://picsum.photos/seed/dev2/200/200" alt="Founder 2" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Developer Two</h4>
                <p className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4">Product Strategist</p>
                <p className="text-slate-500 text-sm font-medium">UI/UX Designer and Frontend engineering expert.</p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">Syntax Society &copy; 2024 • All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
