'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/common/AuthProvider';

export default function ExperiencePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'student') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'student') {
    return null; // Avoid rendering protected content before redirect
  }

  return (
    <div>
      {/* Your protected content here */}
      <h1>Welcome to the Experience Page!</h1>
    </div>
  );
}
