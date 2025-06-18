'use client';
import { BadgeCheck } from 'lucide-react';

interface ExperienceCardProps {
  exp: {
    id: string;
    title: string;
    shortDescription: string;
    experienceDate: string;
    verified: boolean;
  };
}

export const ExperienceCard = ({ exp }: ExperienceCardProps) => (
  <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
    <div className="flex justify-between items-start">
      <h2 className="text-lg font-semibold">{exp.title}</h2>
      {exp.verified && <BadgeCheck className="text-green-500 w-5 h-5" />}
    </div>
    <p className="text-sm text-gray-500 mt-1">{exp.shortDescription}</p>
    <div className="text-xs text-gray-400 mt-2">Date: {exp.experienceDate}</div>
  </div>
);
