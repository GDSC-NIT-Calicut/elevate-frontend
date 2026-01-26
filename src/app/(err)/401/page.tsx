import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">

        <div className="flex flex-col items-center">
          <h1 className="text-7xl font-black text-white tracking-tighter">401</h1>
          <h2 className="text-2xl font-bold text-zinc-100 mt-2">Access Denied</h2>
        </div>

        <p className="text-zinc-400 text-lg">
          Sorry, this page is reserved for authorized users. It looks like your current session doesn't have the permissions required to view this area.
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            Go to Login
          </Link>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 font-bold rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </div>


      </div>
    </div>
  );
};

export default UnauthorizedPage;