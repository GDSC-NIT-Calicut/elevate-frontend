'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExperienceDetail } from '@/components/ExperienceDetail';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Experience } from '@/types';
import mockExperiences from '@/hooks/useMock';

export default function ExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const experiences = mockExperiences;
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // Find experience by slug
      const foundExperience = experiences.find((exp: Experience) => exp.id === params.id);

      if (foundExperience) {
        setExperience(foundExperience);
      } else {
        // Experience not found, redirect to 404 or experiences list
        router.push('/experiences');
      }
      setLoading(false);
    }
  }, [params.id, experiences, router]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-1">
        <Header onSearch={() => {}} onNavigate={() => {}} currentView="main" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-9 mx-auto"></div>
            <p className="mt-4 text-green-11">Loading experience...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-green-1">
        <Header onSearch={() => {}} onNavigate={() => {}} currentView="main" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-12 mb-4">Experience Not Found</h1>
            <p className="text-green-11 mb-6">The experience you're looking for doesn't exist.</p>
            <button 
              onClick={handleBack}
              className="bg-green-9 hover:bg-green-10 text-white px-6 py-2 rounded-md"
            >
              Back to Experiences
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-1">
      <Header onSearch={() => {}} onNavigate={() => {}} currentView="main" />
      <ExperienceDetail experience={experience} onBack={handleBack} />
      <Footer />
    </div>
  );
}
