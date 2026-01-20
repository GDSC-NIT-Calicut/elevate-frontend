import { Filter, X, MapPin, Calendar, DollarSign, User, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Link from "next/link";
import { Experience, ExperienceCardProps } from "@/types";
import { cn } from "@/lib/utils";

export function FilterSection({ filters, onFilterChange, onClearFilters, activeFiltersCount }: any) {
  const FilterTrigger = ({ placeholder }: { placeholder: string }) => (
    <SelectTrigger className="w-auto min-w-[110px] border-none bg-slate-50/80 hover:bg-slate-100 rounded-xl h-9 px-4 text-slate-600 focus:ring-0 shadow-none transition-colors text-sm font-medium">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
  );

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[20px] p-3 mb-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 px-4 border-r border-slate-100 mr-2">
          <Filter className="w-4 h-4 text-emerald-500" />
          <span className="font-bold text-slate-800 text-sm">Filters</span>
        </div>

        <div className="flex items-center gap-2">
          {['Company', 'Role', 'Year', 'Department', 'Offer Type', 'Difficulty'].map((label) => (
            <Select key={label} onValueChange={(v) => onFilterChange(label.toLowerCase().replace(' ', ''), v)}>
              <FilterTrigger placeholder={label} />
              <SelectContent className="rounded-xl border-slate-100 shadow-lg">
                <SelectItem value="placeholder">Loading...</SelectItem>
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost" 
        onClick={onClearFilters}
        className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 font-bold text-sm rounded-full px-4"
      >
        Clear all
      </Button>
    </div>
  );
}

export function ExperienceCard({ exp, isCompact = false }: ExperienceCardProps) {
  const [showFullExperience, setShowFullExperience] = useState(false);

  if (isCompact) {
    return (
      <Link href={`/experiences/${exp.id}`} className="block mb-3">
        <Card className="border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all rounded-[20px]">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-50 rounded-xl flex items-center justify-center">
                {exp.company.logo ? (
                  <img src={exp.company.logo} alt="" className="w-6 h-6 object-contain opacity-90" />
                ) : (
                  <Briefcase className="w-5 h-5 text-slate-300" />
                )}
              </div>

              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900 text-base leading-none tracking-tight">
                  {exp.company.name}
                </h3>
                <p className="text-slate-500 text-sm font-medium">{exp.role}</p>
                <div className="flex items-center gap-3 mt-1 text-slate-400 text-[12px]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {exp.author.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Oct 2024
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-blue-50/80 text-blue-600 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-none">
                {exp.job_type === 'fte' ? 'Full-time' : exp.job_type}
              </Badge>
              {exp.verified && (
                <Badge className="bg-emerald-50/80 text-emerald-600 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-none">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="border-slate-100 bg-white shadow-sm rounded-[24px]">
      <CardContent className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-50">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-50 flex items-center justify-center">
              {exp.company.logo ? (
                <img src={exp.company.logo} alt="" className="w-10 h-10 object-contain" />
              ) : (
                <Briefcase className="w-8 h-8 text-slate-300" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{exp.company.name}</h2>
              <p className="text-lg text-slate-500">{exp.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
             <Badge className="bg-blue-50 text-blue-600 border-none px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
                FULL-TIME
             </Badge>
             <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
             </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author</span>
            <div className="flex items-center text-slate-700 font-semibold"><User className="w-4 h-4 mr-2 text-slate-300" /> {exp.author.name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</span>
            <div className="flex items-center text-slate-700 font-semibold"><Calendar className="w-4 h-4 mr-2 text-slate-300" /> Oct 2024</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dept</span>
            <div className="flex items-center text-slate-700 font-semibold"><MapPin className="w-4 h-4 mr-2 text-slate-300" /> {exp.author.department}</div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Comp</span>
            <div className="flex items-center text-emerald-600 font-bold"><DollarSign className="w-4 h-4 mr-1" /> {exp.compensation}</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-emerald-500 rounded-full" /> Interview Rounds
          </h4>
          <div className="grid gap-3">
            {exp.content?.interviewRounds?.map((round: any, i: number) => (
              <div key={i} className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                <div className="text-[10px] font-black text-emerald-600 uppercase mb-1">Round {i+1} • {round.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{round.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-[24px] relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">Pro Tips</h4>
            <p className="text-slate-300 text-sm italic leading-relaxed">"{exp.tips}"</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
}