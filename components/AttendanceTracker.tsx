
import React, { useRef, useState, useEffect } from 'react';
import { User, Lecture } from '../types';
import { verifyFace } from '../services/geminiService';

interface TrackerProps {
  user: User;
  lecture: Lecture;
}

const AttendanceTracker: React.FC<TrackerProps> = ({ user, lecture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'idle' | 'capturing' | 'verifying' | 'success' | 'failed'>('idle');
  const [message, setMessage] = useState('Camera off. System will scan periodically.');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStatus('capturing');
        setMessage('Looking for your face...');
      }
    } catch (err) {
      setMessage('Error accessing camera.');
    }
  };

  const captureAndVerify = async () => {
    if (!videoRef.current || !canvasRef.current || !user.faceData) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 320, 240);
    const frameData = canvasRef.current.toDataURL('image/jpeg').split(',')[1];

    setStatus('verifying');
    setMessage('Verifying identity with AI...');

    try {
      const result = await verifyFace(user.faceData, frameData);
      if (result.match && result.confidence > 0.7) {
        setStatus('success');
        setMessage('Attendance marked successfully!');
        // Stop stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
      } else {
        setStatus('failed');
        setMessage('Face mismatch. Retrying in a few minutes...');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (e) {
      setStatus('failed');
      setMessage('Verification failed.');
    }
  };

  useEffect(() => {
    // Automatic logic: Mark at start and random mid-point
    // For demo purposes, we provide a "Start Scan" button but normally it's timer-based
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
      <div className="relative w-48 h-36 bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover transition-opacity ${status === 'capturing' || status === 'verifying' ? 'opacity-100' : 'opacity-30'}`}
        />
        <canvas ref={canvasRef} width={320} height={240} className="hidden" />
        
        {status === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
        )}
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
             <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h4 className="font-bold text-sky-900">{status === 'success' ? 'Verified' : 'Verification Status'}</h4>
          <p className="text-sm text-slate-500 font-medium">{message}</p>
        </div>
        
        {status === 'idle' && user.faceRegistered && (
          <button 
            onClick={startCamera}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition-all shadow-md shadow-sky-100"
          >
            Manual Check-In
          </button>
        )}

        {status === 'capturing' && (
          <button 
            onClick={captureAndVerify}
            className="px-6 py-2 bg-sky-500 text-white rounded-xl font-bold animate-pulse"
          >
            Capture Now
          </button>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
