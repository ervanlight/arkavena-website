'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-midnight mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bronze" 
              placeholder="admin@arkavena.com"
              required 
            />
          </div>
          <button type="submit" className="w-full bg-bronze text-\[#0E1B26\] py-2 rounded font-medium hover:bg-opacity-90 transition-colors">
            Send Magic Link
          </button>
        </form>
      </div>
    </div>
  );
}
