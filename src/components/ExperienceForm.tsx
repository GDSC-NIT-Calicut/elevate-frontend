"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, X, Trash2 } from "lucide-react";
import { Experience } from "@/types";

interface InterviewRound {
  title: string;
  roundType: 'Online Assessment' | 'Technical Interview' | 'Behavioral Interview' | 'HR Interview' | 'Case Study' | 'Technical Discussion' | 'Other';
  description: string;
}

interface ExperienceFormData {
  studentName: string;
  company: string;
  role: string;
  location: string;
  package: string;
  year: number;
  department: string;
  interviewRounds: InterviewRound[];
  experience: string;
  tips: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  offerType: "Internship" | "Full-time" | "Both";
}

interface ExperienceFormProps {
  onSubmit: (data: ExperienceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ROUND_TYPES = [
  'Online Assessment',
  'Technical Interview', 
  'Behavioral Interview',
  'HR Interview',
  'Case Study',
  'Technical Discussion',
  'Other'
] as const;

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology", 
  "Electronics",
  "Mechanical",
  "Electrical",
  "Civil",
  "Chemical",
  "Biotechnology",
  "MBA",
  "BBA"
];

const YEARS = ["2024", "2023", "2022", "2021", "2020"];

export function ExperienceForm({ onSubmit, onCancel, isLoading = false }: ExperienceFormProps) {
  const [formData, setFormData] = useState<ExperienceFormData>({
    studentName: "",
    company: "",
    role: "",
    location: "",
    package: "",
    year: 2024,
    department: "",
    interviewRounds: [],
    experience: "",
    tips: [],
    difficulty: "Medium",
    offerType: "Full-time"
  });

  const [newTip, setNewTip] = useState("");
  const [newRound, setNewRound] = useState<InterviewRound>({
    title: "",
    roundType: 'Technical Interview',
    description: ""
  });

  const handleInputChange = (field: keyof ExperienceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addInterviewRound = () => {
    if (newRound.title && newRound.description) {
      setFormData(prev => ({
        ...prev,
        interviewRounds: [...prev.interviewRounds, { ...newRound }]
      }));
      setNewRound({
        title: "",
        roundType: 'Technical Interview',
        description: ""
      });
    }
  };

  const removeInterviewRound = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interviewRounds: prev.interviewRounds.filter((_, i) => i !== index)
    }));
  };

  const updateInterviewRound = (index: number, field: keyof InterviewRound, value: any) => {
    setFormData(prev => ({
      ...prev,
      interviewRounds: prev.interviewRounds.map((round, i) => 
        i === index ? { ...round, [field]: value } : round
      )
    }));
  };

  const addTip = () => {
    if (newTip.trim()) {
      setFormData(prev => ({
        ...prev,
        tips: [...prev.tips, newTip.trim()]
      }));
      setNewTip("");
    }
  };

  const removeTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interviewRounds.length === 0) {
      alert("Please add at least one interview round");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={onCancel} className="mb-6">
          ← Back to Experiences
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Share Your Experience</h1>
        <p className="text-muted-foreground mt-2">
          Help your juniors by sharing your placement interview experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">Your Name *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role/Position *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package">Package *</Label>
                <Input
                  id="package"
                  value={formData.package}
                  onChange={(e) => handleInputChange('package', e.target.value)}
                  required
                  placeholder="e.g., ₹25L, $80K"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select value={formData.year.toString()} onValueChange={(value) => handleInputChange('year', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Interview Difficulty *</Label>
                <Select value={formData.difficulty} onValueChange={(value: any) => handleInputChange('difficulty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="offerType">Offer Type *</Label>
                <Select value={formData.offerType} onValueChange={(value: any) => handleInputChange('offerType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select offer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Rounds */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Rounds *</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add details about each round of your interview process
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Existing Rounds */}
            {formData.interviewRounds.map((round, index) => (
              <div key={index} className="p-4 border rounded-lg bg-secondary/20">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">Round {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeInterviewRound(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Round Title</Label>
                    <Input
                      value={round.title}
                      onChange={(e) => updateInterviewRound(index, 'title', e.target.value)}
                      placeholder="e.g., Technical Interview 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Round Type</Label>
                    <Select 
                      value={round.roundType} 
                      onValueChange={(value: any) => updateInterviewRound(index, 'roundType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROUND_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={round.description}
                    onChange={(e) => updateInterviewRound(index, 'description', e.target.value)}
                    placeholder="Describe what happened in this round..."
                    rows={3}
                  />
                </div>
              </div>
            ))}

            {/* Add New Round */}
            <div className="p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Round Title</Label>
                  <Input
                    value={newRound.title}
                    onChange={(e) => setNewRound(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Technical Interview 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Round Type</Label>
                  <Select 
                    value={newRound.roundType} 
                    onValueChange={(value: any) => setNewRound(prev => ({ ...prev, roundType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROUND_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label>Description</Label>
                <Textarea
                  value={newRound.description}
                  onChange={(e) => setNewRound(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what happened in this round..."
                  rows={3}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addInterviewRound}
                disabled={!newRound.title || !newRound.description}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Round
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overall Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Experience</CardTitle>
            <p className="text-sm text-muted-foreground">
              Share your overall experience and learnings
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Description *</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                required
                placeholder="Share your overall experience, what you learned, challenges faced, etc."
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Future Candidates</CardTitle>
            <p className="text-sm text-muted-foreground">
              Share helpful tips and advice for students preparing for similar interviews
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Tips */}
            {formData.tips.map((tip, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                <span className="text-sm text-muted-foreground">{index + 1}.</span>
                <span className="flex-1">{tip}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTip(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {/* Add New Tip */}
            <div className="flex gap-2">
              <Input
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
                placeholder="Enter a helpful tip..."
                onKeyPress={(e) => e.key === 'Enter' && addTip()}
              />
              <Button type="button" onClick={addTip} disabled={!newTip.trim()}>
                Add Tip
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Experience"}
          </Button>
        </div>
      </form>
    </div>
  );
}

