import { Filter, X } from "lucide-react";
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
  const companies = [
    "Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Adobe", 
    "Goldman Sachs", "JP Morgan", "Morgan Stanley", "Deloitte", "PwC", 
    "Infosys", "TCS", "Wipro", "Accenture", "IBM", "Oracle"
  ];

  const roles = [
    "Software Engineer", "Data Scientist", "Product Manager", "Business Analyst",
    "Consultant", "Financial Analyst", "Marketing Specialist", "UX Designer",
    "Backend Developer", "Frontend Developer", "Full Stack Developer"
  ];

  const departments = [
    "Computer Science", "Information Technology", "Electronics", "Mechanical",
    "Electrical", "Civil", "Chemical", "Biotechnology", "MBA", "BBA"
  ];

  const years = ["2024", "2023", "2022", "2021", "2020"];

  const jobTypes = [
    { value: "fte", label: "Full-time" },
    { value: "internship", label: "Internship" },
    { value: "research", label: "Research" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="bg-green-1 border border-green-6 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-green-11" />
          <h2 className="font-semibold text-green-12">Filter Experiences</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
        <Select value={filters.company || undefined} onValueChange={(value: string) => onFilterChange('company', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.role || undefined} onValueChange={(value: string) => onFilterChange('role', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.year || undefined} onValueChange={(value: string) => onFilterChange('year', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.department || undefined} onValueChange={(value: string) => onFilterChange('department', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.offerType || undefined} onValueChange={(value: string) => onFilterChange('offerType', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Offer Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Both">Both</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.difficulty || undefined} onValueChange={(value: string) => onFilterChange('difficulty', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.roundType || undefined} onValueChange={(value: string) => onFilterChange('roundType', value || "")}>
          <SelectTrigger>
            <SelectValue placeholder="Round Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Online Assessment">Online Assessment</SelectItem>
            <SelectItem value="Technical Interview">Technical Interview</SelectItem>
            <SelectItem value="Behavioral Interview">Behavioral Interview</SelectItem>
            <SelectItem value="HR Interview">HR Interview</SelectItem>
            <SelectItem value="Case Study">Case Study</SelectItem>
            <SelectItem value="Technical Discussion">Technical Discussion</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}