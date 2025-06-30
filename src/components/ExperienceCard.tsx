"use client";

interface ExperienceCardProps {
  author: Object;
  title: string;
  role: string;
  short_description: string;
  published_date: string;
  experience_date: string;
  stipend: number;
  job_type: string;
  company: number;
}
export const ExperienceCard = (exp : ExperienceCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900">
      {exp.role}
    </h2>
    <p className="text-sm text-gray-500">
      {exp.company} · {exp.experience_date} · Remote
    </p>
    <p className="mt-2 text-gray-700 text-sm">
      {exp.short_description}
    </p>
    <div className="mt-4 flex flex-wrap gap-2 text-xs">
      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
        {exp.job_type}
      </span>
      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
        Remote
      </span>
    </div>
  </div>
);
