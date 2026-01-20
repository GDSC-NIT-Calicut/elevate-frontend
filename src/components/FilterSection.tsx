import { ListFilter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

export interface FilterState {
  company: string;
  role: string;
  year: string;
  department: string;
  offerType: string;
  difficulty: string;
  roundType: string;
}

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function FilterSection({ filters, onFilterChange, onClearFilters, activeFiltersCount }: FilterSectionProps) {
  const companies = ["Google", "Microsoft", "Amazon", "Apple", "Meta"];
  const roles = ["Software Engineer", "Data Scientist", "Product Manager"];
  const departments = ["Computer Science", "Information Technology", "Electronics"];
  const years = ["2024", "2023", "2022"];

  const FilterSelect = ({ 
    label, 
    value, 
    onChange, 
    options 
  }: { 
    label: string, 
    value: string, 
    onChange: (val: string) => void, 
    options: string[] 
  }) => (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white border-none shadow-sm h-10 rounded-xl text-slate-600 focus:ring-1 focus:ring-green-500">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-green-100 shadow-xl">
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="rounded-lg focus:bg-green-50">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="bg-[#e2ede4] rounded-[40px] p-8 md:p-12 mb-8 shadow-sm border border-white/20">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-slate-700" />
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Filter Experiences</h2>
          </div>
          <div>
            <Badge className="bg-[#2d4a35] hover:bg-[#2d4a35] text-white px-3 py-1 rounded-lg text-xs font-medium border-none">
              {activeFiltersCount} active
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 flex-1">
          <FilterSelect 
            label="Company" 
            value={filters.company} 
            options={companies} 
            onChange={(v) => onFilterChange('company', v)} 
          />
          <FilterSelect 
            label="Role" 
            value={filters.role} 
            options={roles} 
            onChange={(v) => onFilterChange('role', v)} 
          />
          <FilterSelect 
            label="Year" 
            value={filters.year} 
            options={years} 
            onChange={(v) => onFilterChange('year', v)} 
          />
          <FilterSelect 
            label="Department" 
            value={filters.department} 
            options={departments} 
            onChange={(v) => onFilterChange('department', v)} 
          />
          <FilterSelect 
            label="Offer Type" 
            value={filters.offerType} 
            options={["Internship", "Full-time"]} 
            onChange={(v) => onFilterChange('offerType', v)} 
          />
          <FilterSelect 
            label="Difficulty" 
            value={filters.difficulty} 
            options={["Easy", "Medium", "Hard"]} 
            onChange={(v) => onFilterChange('difficulty', v)} 
          />
          <FilterSelect 
            label="Round Type" 
            value={filters.roundType} 
            options={["Technical", "HR", "Behavioral"]} 
            onChange={(v) => onFilterChange('roundType', v)} 
          />
        </div>

        <div className="flex items-center justify-end">
          <Button 
            variant="ghost" 
            onClick={onClearFilters}
            className="text-red-500 hover:text-red-600 hover:bg-red-50/50 font-semibold rounded-2xl px-6 py-6 transition-all"
          >
            Clear all
          </Button>
        </div>
      </div>
    </div>
  );
}