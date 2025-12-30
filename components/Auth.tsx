
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const mockAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate actual Gmail/Database connection
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: "John Doe",
      email: "john.doe@gmail.com",
      faceRegistered: false,
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-sky-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sky-900 mb-2">
            {isSignUp ? 'Join Us' : 'Welcome Back'}
          </h2>
          <p className="text-sky-500">Manage your attendance with ease</p>
        </div>

        <form onSubmit={mockAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-sky-900 mb-1 ml-1">Full Name</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl bg-sky-50 border-none focus:ring-2 focus:ring-sky-200 outline-none" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-1 ml-1">Gmail Address</label>
            <input type="email" required className="w-full px-4 py-3 rounded-xl bg-sky-50 border-none focus:ring-2 focus:ring-sky-200 outline-none" placeholder="example@gmail.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-1 ml-1">Password</label>
            <input type="password" required className="w-full px-4 py-3 rounded-xl bg-sky-50 border-none focus:ring-2 focus:ring-sky-200 outline-none" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-sky-100 flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.696-7.12 2.696-6.136 0-10.944-4.968-10.944-11.1s4.808-11.1 10.944-11.1c3.312 0 5.688 1.304 7.464 3.032l2.312-2.312c-1.976-1.896-4.544-3.32-9.776-3.32-8.52 0-15.584 7.064-15.584 15.584s7.064 15.584 15.584 15.584c4.544 0 7.96-1.504 10.616-4.288 2.736-2.736 3.6-6.624 3.6-9.824 0-.64-.056-1.256-.16-1.84h-14.112z"/>
            </svg>
            <span>{isSignUp ? 'Sign up with Google' : 'Login with Google'}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sky-600 font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
