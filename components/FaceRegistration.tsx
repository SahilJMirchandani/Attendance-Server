
import React, { useRef, useState } from 'react';
import { User, View } from '../types';

interface FaceRegProps {
  user: User;
  setUser: (u: User) => void;
  setView: (v: View) => void;
}

const FaceRegistration: React.FC<FaceRegProps> = ({ user, setUser, setView }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturing, setCapturing] = useState(false);

  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCapturing(true);
      }
    } catch (err) {
      alert("Camera access denied.");
    }
  };

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    const data = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
    
    const updatedUser = { ...user, faceRegistered: true, faceData: data };
    setUser(updatedUser);
    localStorage.setItem('as_user', JSON.stringify(updatedUser));
    
    // Stop tracks
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    setCapturing(false);
  };

  return (
    <div className="h-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-sky-600 font-bold hover:translate-x-[-4px] transition-transform">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Face Registration</h2>
          <p className="text-slate-500 mb-10 font-medium">This enables the hardware to automatically mark your attendance.</p>
          
          <div className="relative w-full max-w-md mx-auto aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-8">
            {user.faceRegistered && !capturing ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-sky-50">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-bold text-sky-900">Your face is registered!</p>
                <button onClick={startCam} className="mt-4 text-sky-600 text-sm font-bold hover:underline">Re-register face</button>
              </div>
            ) : capturing ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                 <button onClick={startCam} className="bg-white text-slate-900 font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform">Start Camera</button>
              </div>
            )}
            <canvas ref={canvasRef} width={640} height={480} className="hidden" />
          </div>

          {capturing && (
            <button 
              onClick={capture}
              className="px-10 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-sky-100 transition-all hover:-translate-y-1"
            >
              Take Snapshot
            </button>
          )}

          <div className="mt-12 text-left p-6 bg-sky-50 rounded-2xl border border-sky-100">
            <h4 className="font-bold text-sky-900 mb-2">Why do I need this?</h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li className="flex items-start">
                <span className="text-sky-500 mr-2">•</span>
                <span>Our hardware (cam) matches your face during lectures.</span>
              </li>
              <li className="flex items-start">
                <span className="text-sky-500 mr-2">•</span>
                <span>Continuous monitoring is not required (start/mid/end scans).</span>
              </li>
              <li className="flex items-start">
                <span className="text-sky-500 mr-2">•</span>
                <span>Data is processed securely on Syntax Society's cloud.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRegistration;
