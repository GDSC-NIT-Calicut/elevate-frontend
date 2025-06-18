"use client";

import { useRouter } from 'next/navigation';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-lg mb-8">
        You need to be logged in to access this page.
      </p>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.push('/login')}
      >
        Go to Login
      </button>
      <button
        className="mt-4 px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        onClick={() => router.push('/')}
      >
        Go to Home
      </button>
    </div>
  );
}
