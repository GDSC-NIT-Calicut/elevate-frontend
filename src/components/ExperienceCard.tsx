import { MapPin, Calendar, DollarSign, User, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  isCompact?: boolean;
}

export function ExperienceCard({ experience, isCompact = false }: ExperienceCardProps) {
  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
        case "internship": return "bg-yellow-400 text-black";
      case "fte": return "bg-blue-500 text-white";
      case "research": return "bg-green-600 text-green-700";
      case "other": return "bg-green-300 text-green-700";
      default: return "bg-green-300 text-green-400";
    }
  };

  const getJobTypeLabel = (jobType: string) => {
    switch (jobType) {
      case "internship": return "Internship";
      case "fte": return "Full-time";
      case "research": return "Research";
      case "other": return "Other";
      default: return "Other";
    }
  };

  if (isCompact) {
    return (
      <Link href={`/experiences/${experience.id}`}>
        <Card 
          className="bg-green-1 border-green-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-4 rounded-lg flex items-center justify-center">
                {experience.company.logo ? (
                  <img src={experience.company.logo} alt={experience.company.name} className="w-6 h-6" />
                ) : (
                  <Briefcase className="w-5 h-5 text-green-11" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-green-12">{experience.company.name}</h3>
                <p className="text-sm text-green-11">{experience.role}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <Badge className={getJobTypeColor(experience.job_type)} variant="secondary">
                {getJobTypeLabel(experience.job_type)}
              </Badge>
              {experience.verified && (
                <Badge className="bg-green-7 text-green-12" variant="secondary">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-green-11">
              <User className="w-4 h-4 mr-2" />
              {experience.author.name}
            </div>
            <div className="flex items-center text-green-11">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(experience.experience_date).getFullYear()}
            </div>
            <div className="flex items-center text-green-11">
              <MapPin className="w-4 h-4 mr-2" />
              {experience.author.department}
            </div>
            <div className="flex items-center text-green-12 font-medium">
              <DollarSign className="w-4 h-4 mr-2" />
              {experience.compensation}
            </div>
          </div>

          <p className="text-green-11 text-sm leading-relaxed">
            {experience.short_description.substring(0, 120)}...
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-green-11">
              {experience.content?.interviewRounds?.length || 0} rounds
            </span>
            <Button variant="ghost" size="sm" className="text-green-9 hover:text-green-10">
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
      </Link>
    );
  }

  // Full detailed card view (kept for admin panel and detailed view)
  const [showFullExperience, setShowFullExperience] = useState(false);

  return (
    <Card className="bg-green-1 border-green-6 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-4 rounded-lg flex items-center justify-center">
              {experience.company.logo ? (
                <img src={experience.company.logo} alt={experience.company.name} className="w-8 h-8" />
              ) : (
                <Briefcase className="w-6 h-6 text-green-11" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-green-12">{experience.company.name}</h3>
              <p className="text-green-11">{experience.role}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getJobTypeColor(experience.job_type)} variant="secondary">
              {getJobTypeLabel(experience.job_type)}
            </Badge>
            {experience.verified && (
              <Badge className="bg-green-7 text-green-12" variant="secondary">
                Verified
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-green-11">
            <User className="w-4 h-4 mr-2" />
            {experience.author.name} - {experience.author.department}
          </div>
          <div className="flex items-center text-green-11">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(experience.experience_date).getFullYear()}
          </div>
          <div className="flex items-center text-green-11">
            <MapPin className="w-4 h-4 mr-2" />
            {experience.author.department}
          </div>
          <div className="flex items-center text-green-12 font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            {experience.compensation}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-green-12 mb-2">Interview Rounds:</h4>
          <div className="space-y-2">
            {experience.content?.interviewRounds?.map((round: any, index: number) => (
              <div key={index} className="border-l-2 border-green-6 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-green-4 text-green-11 px-2 py-1 rounded">
                    Round {index + 1}
                  </span>
                  <span className="font-medium text-sm text-green-12">{round.title}</span>
                </div>
                <p className="text-sm text-green-11">{round.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-green-12 mb-2">Experience:</h4>
          <p className="text-green-11 text-sm leading-relaxed">
            {showFullExperience 
              ? experience.content?.experience 
              : `${experience.content?.experience?.substring(0, 200)}${experience.content?.experience?.length > 200 ? '...' : ''}`
            }
          </p>
          {experience.content?.experience?.length > 200 && (
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm text-green-9"
              onClick={() => setShowFullExperience(!showFullExperience)}
            >
              {showFullExperience ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>

        <div>
          <h4 className="font-medium text-green-12 mb-2">Tips:</h4>
          <p className="text-green-11 text-sm leading-relaxed">
            {experience.tips}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}