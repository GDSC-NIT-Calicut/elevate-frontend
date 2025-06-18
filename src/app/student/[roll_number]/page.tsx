'use client';

import { useAuth } from '@/components/common/AuthProvider';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();

  const rollNumber = params.roll_number as string;

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'student')) {
      router.push('/unauthorized');
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== 'student') {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Viewing roll number: {rollNumber}</p>
    </div>
  );
}
