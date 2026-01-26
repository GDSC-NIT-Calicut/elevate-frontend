'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Building2, ArrowUpRight } from 'lucide-react';

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    logo: string;
    slug: string;
    description: string;
  };
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  // Guard against empty or broken logo strings
  const logoSrc = company.logo && company.logo.trim() !== "" ? company.logo : null;

  return (
    <Link 
      href={`/companies/${company.slug}`} 
      className="group flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-[20px] shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-300 relative overflow-hidden"
    >
      {/* Logo Container */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-slate-50 bg-slate-50 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition-colors">
        {logoSrc ? (
          <Image 
            src={logoSrc} 
            alt={company.name} 
            width={48} 
            height={48} 
            className="object-contain p-1"
          />
        ) : (
          <Building2 className="w-6 h-6 text-slate-300" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-6">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
          {company.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-0.5">
          {company.description || "Leading innovator in technology and product development."}
        </p>
      </div>

      {/* Subtle "Open" Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
      </div>
    </Link>
  );
};