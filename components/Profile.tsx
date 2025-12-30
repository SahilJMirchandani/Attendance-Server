
import React, { useState } from 'react';
import { User, View } from '../types';

interface ProfileProps {
  user: User;
  setUser: (u: User) => void;
  setView: (v: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser, setView }) => {
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const save = () => {
    const updated = { ...user, name };
    setUser(updated);
    localStorage.setItem('as_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-sky-600 font-bold hover:translate-x-[-4px] transition-transform">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
          <div className="flex flex-col items-center mb-10">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-sky-100 overflow-hidden border-4 border-white shadow-xl">
                <img src={user.photoUrl || "https://picsum.photos/seed/user/200/200"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-opacity">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-4">Edit Profile</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-sky-100 outline-none font-medium" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 ml-1">Email (Primary Gmail)</label>
              <input 
                type="email" 
                disabled 
                value={user.email}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 text-slate-400 border-none cursor-not-allowed font-medium" 
              />
            </div>

            <button 
              onClick={save}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-lg ${saved ? 'bg-green-500 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-100'}`}
            >
              {saved ? 'Changes Saved!' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
