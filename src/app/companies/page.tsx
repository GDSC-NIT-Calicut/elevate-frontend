"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Building2, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/ui/loading";
import { CompanyCard } from "@/components/CompanyCard";
import { useAuth } from "@/components/common/AuthProvider";
import axios from "axios";
import { Company, CompanyCardProps } from "@/types";

const MOCK_COMPANIES = [
  {
    id: "1",
    name: "Amazon",
    slug: "amazon",
    logo: "https://www.amazon.com/favicon.ico",
  },
  {
    id: "2",
    name: "Atlassian",
    slug: "atlassian",
    logo: "https://www.atlassian.com/favicon.ico",
  },
  {
    id: "3",
    name: "Google",
    slug: "google",
    logo: "https://www.google.com/favicon.ico",
  },
  {
    id: "4",
    name: "Goldman Sachs",
    slug: "goldman-sachs",
    logo: "https://www.goldmansachs.com/favicon.ico",
  },
  {
    id: "5",
    name: "Microsoft",
    slug: "microsoft",
    logo: "https://www.microsoft.com/favicon.ico",
  },
  {
    id: "6",
    name: "Texas Instruments",
    slug: "texas-instruments",
    logo: "https://www.ti.com/favicon.ico",
  },
];

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { tokens } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const getCompanies = async () => {
      if (!tokens?.access) return;

      try {
        const response = await axios.get(`${BACKEND_API_URL}/api/company`, {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        setCompanies(response.data.results || response.data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setIsMounted(true);
      }
    };

    getCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((c) => c.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, companies]);

  if (!isMounted) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <Building2 className="text-emerald-500 w-8 h-8" />
              Companies
            </h1>
            <p className="text-slate-500">
              Browse interview experiences by company.
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <Input
              placeholder="Search companies..."
              className="pl-12 h-12 bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-emerald-500/20 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
            <p className="text-slate-400 font-medium">
              No companies match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
