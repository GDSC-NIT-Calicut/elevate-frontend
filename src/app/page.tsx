"use client";
import { useState, useMemo, useEffect } from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FilterSection, FilterState } from "../components/FilterSection";
import { ExperienceCard } from "../components/ExperienceCard";
import { Experience } from "@/types";
import { ExperienceDetail } from "../components/ExperienceDetail";

import { Footer } from "../components/Footer";
import { SubmissionForm } from "../components/SubmissionForm";
import { AdminPanel } from "../components/AdminPanel";
import { Toaster } from "../components/ui/sonner";
import mockExperiences from "../hooks/useMock";


type ViewType = 'main' | 'submit' | 'admin' | 'detail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [filters, setFilters] = useState<FilterState>({
    company: "",
    role: "",
    year: "",
    department: "",
    offerType: "",
    difficulty: "",
    roundType: ""
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      company: "",
      role: "",
      year: "",
      department: "",
      offerType: "",
      difficulty: "",
      roundType: ""
    });
    setSearchQuery("");
  };

  const handleExperienceSubmit = (experienceData: Omit<Experience, "id" | "verified" | "published_date">) => {
    const newExperience: Experience = {
      ...experienceData,
      id: Date.now().toString(),
      verified: false,
      published_date: new Date().toISOString()
    };
    
    setExperiences(prev => [...prev, newExperience]);
    setCurrentView('main');
  };

  const handleApproveExperience = (id: string) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, status: "approved" as const } : exp
      )
    );
  };

  const handleRejectExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleEditExperience = (id: string, updatedExperience: Partial<Experience>) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, ...updatedExperience } : exp
      )
    );
  };

  const handleViewExperienceDetail = (id: string) => {
    setSelectedExperienceId(id);
    setCurrentView('detail');
  };

  const handleNavigate = (view: 'main' | 'submit' | 'admin') => {
    setCurrentView(view);
    setSelectedExperienceId(null);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== "").length;

  // Only show verified experiences in the main view
  const approvedExperiences = experiences.filter(exp => exp.verified);

  const filteredExperiences = useMemo(() => {
    return approvedExperiences.filter(exp => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          exp.company.name.toLowerCase().includes(query) ||
          exp.role.toLowerCase().includes(query) ||
          exp.author.name.toLowerCase().includes(query) ||
          exp.author.department?.toLowerCase().includes(query) ||
          exp.title.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Other filters
      if (filters.company && exp.company.name !== filters.company) return false;
      if (filters.role && exp.role !== filters.role) return false;
      if (filters.year && new Date(exp.experience_date).getFullYear().toString() !== filters.year) return false;
      if (filters.department && exp.author.department !== filters.department) return false;
      if (filters.offerType && exp.job_type !== filters.offerType) return false;
      return true;
    });
  }, [searchQuery, filters, approvedExperiences]);

  const selectedExperience = selectedExperienceId 
    ? experiences.find(exp => exp.id === selectedExperienceId)
    : null;

  const renderCurrentView = () => {
    switch (currentView) {
      case 'submit':
        return (
          <SubmissionForm 
            onSubmit={handleExperienceSubmit}
            onBack={() => setCurrentView('main')}
          />
        );
      case 'admin':
        return (
          <AdminPanel
            experiences={experiences}
            onApprove={handleApproveExperience}
            onReject={handleRejectExperience}
            onEdit={handleEditExperience}
            onBack={() => setCurrentView('main')}
          />
        );
      case 'detail':
        return selectedExperience ? (
          <ExperienceDetail
            experience={selectedExperience}
            onBack={() => setCurrentView('main')}
          />
        ) : null;
      default:
        return (
          <>
            <HeroSection />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-green-2">
              <section id="experiences">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-green-12 mb-4">Placement Experiences</h2>
                  <p className="text-xl text-green-11">
                    Learn from your seniors' journey to success
                  </p>
                </div>

                <FilterSection
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  activeFiltersCount={activeFiltersCount}
                />

                <div className="mb-6">
                  <p className="text-green-11">
                    Showing {filteredExperiences.length} of {approvedExperiences.length} experiences
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                <div className="grid gap-6 mb-12">
                  {filteredExperiences.map((experience) => (
                    <ExperienceCard 
                      key={experience.id} 
                      experience={experience} 
                      isCompact={true}
                      onViewDetails={handleViewExperienceDetail}
                    />
                  ))}
                </div>

                {filteredExperiences.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-green-12 mb-2">No experiences found</h3>
                    <p className="text-green-11 mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <button 
                      onClick={handleClearFilters}
                      className="text-green-9 hover:text-green-10 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </section>
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-green-1">
      <Header 
        onSearch={setSearchQuery} 
        onNavigate={handleNavigate}
        currentView={currentView === 'detail' ? 'main' : currentView}
      />
      {renderCurrentView()}
      <Toaster />
    </div>
  );
}