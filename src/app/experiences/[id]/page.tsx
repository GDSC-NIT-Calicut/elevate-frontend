'use client';

import { useAuth } from '@/components/common/AuthProvider';
import { useRouter } from 'next/navigation';

export default function ExperiencePage({ params }: { params: { roll_number: string } }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-4">Loading...</p>;

  if (!isAuthenticated || user?.role !== 'student') {
    router.push('/unauthorized');
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Viewing roll number: {params.roll_number}</p>
    </div>
  );
}
