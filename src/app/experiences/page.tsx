'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/common/AuthProvider';

export default function ExperiencePage() {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'student') {
        router.push('/');
      }
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading || !isAuthenticated || user?.role !== 'student') {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
      {/* Your protected content here */}
      <h1>Welcome to the Experience Page!</h1>
    </div>
  );
}
