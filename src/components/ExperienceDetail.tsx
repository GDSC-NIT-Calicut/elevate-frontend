import { ArrowLeft, MapPin, Calendar, DollarSign, User, Briefcase, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Experience } from "@/types";

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
}

export function ExperienceDetail({ experience, onBack }: ExperienceDetailProps) {
  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case "internship": return "bg-green-4 text-green-11";
      case "fte": return "bg-green-5 text-green-12";
      case "research": return "bg-green-6 text-green-12";
      case "other": return "bg-green-3 text-green-11";
      default: return "bg-green-3 text-green-11";
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

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experiences
        </Button>

        {/* Header Card */}
        <Card className="mb-8 bg-opac">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-4 rounded-xl flex items-center justify-center">
                  {experience.company.logo ? (
                    <img src={experience.company.logo} alt={experience.company.name} className="w-10 h-10" />
                  ) : (
                    <Briefcase className="w-8 h-8 text-green-11" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">{experience.company.name}</CardTitle>
                  <p className="text-xl text-green-11 mb-2">{experience.role}</p>
                  <div className="flex items-center space-x-4 text-sm text-green-11">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {experience.author.name}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(experience.experience_date).getFullYear()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Published on {formatDate(new Date(experience.published_date))}
                    </div>
                  </div>
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-9" />
                <div>
                  <p className="text-sm text-green-11">Department</p>
                  <p className="font-medium text-green-12">{experience.author.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-green-9" />
                <div>
                  <p className="text-sm text-green-11">Compensation</p>
                  <p className="font-medium text-green-12">{experience.compensation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-green-9" />
                <div>
                  <p className="text-sm text-green-11">Programme</p>
                  <p className="font-medium text-green-12">{experience.author.programme}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Rounds */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-9" />
              Selection Process ({experience.content?.interviewRounds?.length || 0} Rounds)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {experience.content?.interviewRounds?.map((round: any, index: number) => (
                <div key={index} className="relative">
                  {index < (experience.content?.interviewRounds?.length || 0) - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-[calc(100%-24px)] bg-green-6 z-0"></div>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 z-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0 pt-3">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-yello-12">{round.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {round.roundType}
                        </Badge>
                      </div>
                      <p className="text-green-11 leading-relaxed">{round.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overall Experience */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overall Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-green-11 leading-relaxed whitespace-pre-line">
                {experience.content?.experience}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Future Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-green-11 leading-relaxed whitespace-pre-line">
                {experience.tips}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2">
              Got a placement experience to share?
            </h3>
            <p className="text-muted-foreground mb-4">
              Help your juniors by sharing your interview experience and tips
            </p>
            <Button onClick={() => window.location.href = '/experiences/new'} className="mr-4">
              Share Your Experience
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}