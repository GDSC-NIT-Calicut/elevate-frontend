import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X, Plus, ArrowLeft } from "lucide-react";
import { Experience, User, Company, Tag } from "@/types";
import { toast } from "sonner";

interface SubmissionFormProps {
  onSubmit: (experience: Omit<Experience, "id" | "verified" | "published_date">) => void;
  onBack: () => void;
}

interface InterviewRound {
  title: string;
  roundType: 'Online Assessment' | 'Technical Interview' | 'Behavioral Interview' | 'HR Interview' | 'Case Study' | 'Technical Discussion' | 'Other';
  description: string;
}

export function SubmissionForm({ onSubmit, onBack }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    short_description: "",
    compensation: "",
    experience_date: new Date().toISOString().split('T')[0],
    job_type: "" as 'fte' | 'internship' | 'research' | 'other' | "",
    tips: "",
    cover_image: ""
  });

  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    roll_number: "",
    department: "",
    programme: ""
  });

  const [companyData, setCompanyData] = useState({
    name: "",
    description: ""
  });

  const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
  const [interviewRounds, setInterviewRounds] = useState<InterviewRound[]>([
    { title: "", roundType: 'Technical Interview', description: "" }
  ]);
  const [experienceContent, setExperienceContent] = useState("");

  const departments = [
    "Computer Science", "Information Technology", "Electronics", "Mechanical",
    "Electrical", "Civil", "Chemical", "Biotechnology", "MBA", "BBA"
  ];

  const programmes = [
    "B.Tech", "M.Tech", "BBA", "MBA", "PhD", "MSc", "BSc"
  ];

  const roundTypes = [
    { value: 'Online Assessment', label: 'Online Assessment' },
    { value: 'Technical Interview', label: 'Technical Interview' },
    { value: 'Behavioral Interview', label: 'Behavioral Interview' },
    { value: 'HR Interview', label: 'HR Interview' },
    { value: 'Case Study', label: 'Case Study' },
    { value: 'Technical Discussion', label: 'Technical Discussion' },
    { value: 'Other', label: 'Other' }
  ];

  const jobTypes = [
    { value: "fte", label: "Full-time" },
    { value: "internship", label: "Internship" },
    { value: "research", label: "Research" },
    { value: "other", label: "Other" }
  ];

  const handleNumberOfRoundsChange = (value: string) => {
    const num = parseInt(value);
    if (num > 0 && num <= 10) {
      setNumberOfRounds(num);
      
      // Adjust the interview rounds array
      const currentRounds = [...interviewRounds];
      if (num > currentRounds.length) {
        // Add new empty rounds
        for (let i = currentRounds.length; i < num; i++) {
          currentRounds.push({ title: "", roundType: 'Technical Interview', description: "" });
        }
      } else if (num < currentRounds.length) {
        // Remove excess rounds
        currentRounds.splice(num);
      }
      setInterviewRounds(currentRounds);
    }
  };

  const updateInterviewRound = (index: number, field: 'title' | 'roundType' | 'description', value: string) => {
    const updatedRounds = [...interviewRounds];
    updatedRounds[index] = { 
      ...updatedRounds[index], 
      [field]: field === 'roundType' ? value as InterviewRound['roundType'] : value 
    };
    setInterviewRounds(updatedRounds);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title for your experience");
      return;
    }
    if (!formData.role.trim()) {
      toast.error("Please enter the role");
      return;
    }
    if (!formData.short_description.trim()) {
      toast.error("Please enter a short description");
      return;
    }
    if (!formData.compensation.trim()) {
      toast.error("Please enter the compensation details");
      return;
    }
    if (!formData.job_type) {
      toast.error("Please select the job type");
      return;
    }
    if (!authorData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!authorData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!authorData.department) {
      toast.error("Please select your department");
      return;
    }
    if (!companyData.name.trim()) {
      toast.error("Please enter the company name");
      return;
    }
    if (!experienceContent.trim()) {
      toast.error("Please share your interview experience");
      return;
    }
    
    // Validate interview rounds
    const validRounds = interviewRounds.filter(round => round.title.trim() && round.description.trim());
    if (validRounds.length === 0) {
      toast.error("Please provide at least one complete interview round with title and description");
      return;
    }
    if (validRounds.length !== numberOfRounds) {
      toast.error("Please fill in all interview round details");
      return;
    }
    
    if (!formData.tips.trim()) {
      toast.error("Please add tips for future candidates");
      return;
    }

    // Create mock user and company objects (in real app, these would come from backend)
    const mockUser: User = {
      id: "temp-user-id",
      email: authorData.email,
      name: authorData.name,
      roll_number: authorData.roll_number || undefined,
      department: authorData.department || undefined,
      programme: authorData.programme || undefined,
      role: "student",
      is_active: true,
      is_staff: false
    };

    const mockCompany: Company = {
      id: "temp-company-id",
      name: companyData.name,
      slug: companyData.name.toLowerCase().replace(/\s+/g, '-'),
      logo: "",
      description: companyData.description || ""
    };

    const experienceData: Omit<Experience, "id" | "verified" | "published_date"> = {
      cover_image: formData.cover_image || undefined,
      title: formData.title,
      role: formData.role,
      short_description: formData.short_description,
      content: {
        interviewRounds: validRounds,
        experience: experienceContent
      },
      tips: formData.tips,
      experience_date: formData.experience_date,
      visibility: true,
      compensation: formData.compensation,
      job_type: formData.job_type as 'fte' | 'internship' | 'research' | 'other',
      author: mockUser,
      company: mockCompany,
      tags: []
    };

    onSubmit(experienceData);
    toast.success("Experience submitted successfully! It will be reviewed by our team.");
    
    // Reset form
    setFormData({
      title: "",
      role: "",
      short_description: "",
      compensation: "",
      experience_date: new Date().toISOString().split('T')[0],
      job_type: "",
      tips: "",
      cover_image: ""
    });
    setAuthorData({
      name: "",
      email: "",
      roll_number: "",
      department: "",
      programme: ""
    });
    setCompanyData({
      name: "",
      description: ""
    });
    setNumberOfRounds(1);
    setInterviewRounds([{ title: "", roundType: 'Technical Interview', description: "" }]);
    setExperienceContent("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Experiences
        </Button>
        <h1 className="text-3xl font-bold text-green-12 mb-2">Share Your Experience</h1>
        <p className="text-green-11">
          Help your juniors by sharing your placement/internship experience. Your submission will be reviewed before being published.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience Submission Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Experience Title */}
            <div>
              <Label htmlFor="title">Experience Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Software Engineer Interview Experience at Google"
              />
            </div>

            {/* Author Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-12">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authorName">Your Name *</Label>
                  <Input
                    id="authorName"
                    value={authorData.name}
                    onChange={(e) => setAuthorData({...authorData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="authorEmail">Email *</Label>
                  <Input
                    id="authorEmail"
                    type="email"
                    value={authorData.email}
                    onChange={(e) => setAuthorData({...authorData, email: e.target.value})}
                    placeholder="your.email@nitc.ac.in"
                  />
                </div>
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={authorData.roll_number}
                    onChange={(e) => setAuthorData({...authorData, roll_number: e.target.value})}
                    placeholder="e.g., B20CS001"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select value={authorData.department} onValueChange={(value) => setAuthorData({...authorData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="programme">Programme</Label>
                  <Select value={authorData.programme} onValueChange={(value) => setAuthorData({...authorData, programme: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your programme" />
                    </SelectTrigger>
                    <SelectContent>
                      {programmes.map((prog) => (
                        <SelectItem key={prog} value={prog}>
                          {prog}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-12">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                    placeholder="e.g., Google, Microsoft, Amazon"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="e.g., Software Engineer, Data Scientist"
                  />
                </div>
                <div>
                  <Label htmlFor="compensation">Compensation *</Label>
                  <Input
                    id="compensation"
                    value={formData.compensation}
                    onChange={(e) => setFormData({...formData, compensation: e.target.value})}
                    placeholder="e.g., ₹12L per annum, ₹50k/month"
                  />
                </div>
                <div>
                  <Label htmlFor="jobType">Job Type *</Label>
                  <Select value={formData.job_type} onValueChange={(value) => setFormData({...formData, job_type: value as 'fte' | 'internship' | 'research' | 'other'})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experienceDate">Interview Date *</Label>
                  <Input
                    id="experienceDate"
                    type="date"
                    value={formData.experience_date}
                    onChange={(e) => setFormData({...formData, experience_date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea
                    id="companyDescription"
                    value={companyData.description}
                    onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                    placeholder="Brief description about the company (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.short_description}
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                placeholder="Brief summary of your interview experience (will be shown in the experience card)"
                className="min-h-20"
              />
            </div>

            {/* Interview Rounds */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-12">Interview Rounds</h3>
              <div>
                <Label htmlFor="numberOfRounds">Number of Interview Rounds *</Label>
                <Select value={numberOfRounds.toString()} onValueChange={handleNumberOfRoundsChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select number of rounds" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Round{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic Interview Round Fields */}
              <div className="space-y-4">
                <Label>Interview Round Details *</Label>
                {interviewRounds.map((round, index) => (
                  <Card key={index} className="p-4 bg-green-2 border-green-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium bg-green-4 text-green-11 px-2 py-1 rounded">
                          Round {index + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`round-title-${index}`}>Round Title *</Label>
                          <Input
                            id={`round-title-${index}`}
                            value={round.title}
                            onChange={(e) => updateInterviewRound(index, 'title', e.target.value)}
                            placeholder="e.g., Technical Interview, Online Assessment"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`round-type-${index}`}>Round Type *</Label>
                          <Select 
                            value={round.roundType} 
                            onValueChange={(value) => updateInterviewRound(index, 'roundType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roundTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`round-description-${index}`}>Round Description *</Label>
                        <Textarea
                          id={`round-description-${index}`}
                          value={round.description}
                          onChange={(e) => updateInterviewRound(index, 'description', e.target.value)}
                          placeholder="Describe what happened in this round, types of questions asked, duration, etc."
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="experience">Your Overall Interview Experience *</Label>
              <Textarea
                id="experience"
                value={experienceContent}
                onChange={(e) => setExperienceContent(e.target.value)}
                placeholder="Share your overall interview experience, what you felt during the process, how the interviewers were, any memorable moments, etc."
                className="min-h-32"
              />
              <p className="text-sm text-green-11 mt-1">
                {experienceContent.length} characters
              </p>
            </div>

            {/* Tips */}
            <div>
              <Label htmlFor="tips">Tips for Future Candidates *</Label>
              <Textarea
                id="tips"
                value={formData.tips}
                onChange={(e) => setFormData({...formData, tips: e.target.value})}
                placeholder="Share helpful tips for future candidates. You can include multiple tips separated by new lines."
                className="min-h-24"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Submit Experience
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}