"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Sparkles, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { ExperienceCard } from "@/components/ExperienceCard";
import LoadingScreen from "@/components/ui/loading";
import { useAuth } from "@/components/common/AuthProvider";
import { useRouter } from "next/navigation";

const MOCK_EXPERIENCES = [
  {
    id: "1",
    company: {
      name: "Microsoft",
      logo: "https://www.microsoft.com/favicon.ico",
    },
    role: "Product Management Intern",
    author: {
      name: "Ananya R.",
      department: "Electronics & Communication",
    },
    job_type: "intern",
    verified: true,
    compensation: "1.0L / month",
    tips: "Understand the 'Star' method for behavioral rounds and brush up on guesstimates. They value product thinking over pure coding.",
    content: {
      interviewRounds: [
        {
          title: "Group Discussion",
          description:
            "Case study on a market entry strategy for a new cloud service.",
        },
        {
          title: "Product Design",
          description:
            "Design an elevator system for a 100-story building with priority access.",
        },
        {
          title: "HR Round",
          description:
            "Focused on leadership and handling conflict within a team.",
        },
      ],
    },
  },
  {
    id: "2",
    company: {
      name: "Atlassian",
      logo: "https://www.atlassian.com/favicon.ico",
    },
    role: "Graduate Software Engineer",
    author: {
      name: "Rahul Mehta",
      department: "Computer Science",
    },
    job_type: "fte",
    verified: true,
    compensation: "52.5 LPA",
    tips: "Their values-based interview is just as important as the coding. Be authentic and know the Atlassian values by heart.",
    content: {
      interviewRounds: [
        {
          title: "Online Assessment",
          description: "3 DSA questions (Medium to Hard) on HackerRank.",
        },
        {
          title: "System Design",
          description:
            "Design a URL shortener like Bitly focusing on scalability and low latency.",
        },
        {
          title: "Values Fit",
          description:
            "Deep dive into 'Don't #@!% the customer' and 'Open company, no bullshit' values.",
        },
      ],
    },
  },
  {
    id: "3",
    company: {
      name: "Texas Instruments",
      logo: "https://www.ti.com/favicon.ico",
    },
    role: "Analog Design Engineer",
    author: {
      name: "Arjun Das",
      department: "Electrical Engineering",
    },
    job_type: "fte",
    verified: false,
    compensation: "22 LPA",
    tips: "Focus heavily on Op-amps, MOSFET characteristics, and RC circuits. The written test is very competitive.",
    content: {
      interviewRounds: [
        {
          title: "Technical Test",
          description:
            "Core electronics concepts, RLC circuits, and digital logic.",
        },
        {
          title: "Technical Interview 1",
          description:
            "Drawing circuit diagrams for various amplifier configurations.",
        },
        {
          title: "Managerial Round",
          description:
            "Discussion on past projects and interest in semiconductor industry.",
        },
      ],
    },
  },
  {
    id: "4",
    company: {
      name: "Amazon",
      logo: "https://www.amazon.com/favicon.ico",
    },
    role: "SDE-1",
    author: {
      name: "Kavya Nair",
      department: "Computer Science",
    },
    job_type: "fte",
    verified: true,
    compensation: "45 LPA",
    tips: "Leadership Principles (LPs) are everything. Prepare two stories for every single LP.",
    content: {
      interviewRounds: [
        {
          title: "OA",
          description: "Two coding questions and a work simulation assessment.",
        },
        {
          title: "DSA Round (Bar Raiser)",
          description:
            "Focus on Space-Time complexity optimization for a complex Graph problem.",
        },
        {
          title: "Behavioral",
          description:
            "Questions based on Customer Obsession and Ownership principles.",
        },
      ],
    },
  },
];

export default function ExperiencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted && !loading) {
      if (!isAuthenticated || user?.role !== "admin") {
        router.push("/401");
        console.log(user);
        console.log(isAuthenticated);
      }
    }
  }, [isAuthenticated, user, loading, router]);

  const filteredExperiences = useMemo(() => {
    return MOCK_EXPERIENCES.filter((exp) => {
      const matchesSearch =
        exp.company.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        exp.role.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  if (!isMounted || loading || !isAuthenticated || user?.role !== "admin") {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFB] pb-20">
      <div className="bg-white border-b border-slate-100 pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Interview <span className="text-emerald-500">Experiences.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium max-w-md">
                Learn from the journeys of others who made it to their dream
                companies.
              </p>
            </div>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                placeholder="Search by company or role..."
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 text-base shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-6">
        {/* <FilterSection 
          filters={}
          onFilterChange={handleFilterChange} 
          onClearFilters={clearFilters}
          activeFiltersCount={Object.keys(activeFilters).length}
        /> */}

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 px-2">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredExperiences.length} Results
          </p>
          <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-bold">Sort: Recent</span>
          </div>
        </div>

        {/* Experience Cards List */}
        <div className="space-y-6">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp as any} />
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No experiences found
              </h3>
              <p className="text-slate-500">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
