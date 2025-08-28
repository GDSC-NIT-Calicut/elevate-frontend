import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Edit, 
  Eye, 
  Clock, 
  Users, 
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";
import { Experience, InterviewRound } from "./ExperienceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

interface AdminPanelProps {
  experiences: Experience[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (id: string, updatedExperience: Partial<Experience>) => void;
  onBack: () => void;
}

export function AdminPanel({ experiences, onApprove, onReject, onEdit, onBack }: AdminPanelProps) {
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Experience>>({});

  const pendingExperiences = experiences.filter(exp => exp.status === 'pending');
  const approvedExperiences = experiences.filter(exp => exp.status === 'approved');

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setEditFormData({ ...experience });
  };

  const handleSaveEdit = () => {
    if (editingExperience && editFormData) {
      onEdit(editingExperience.id, editFormData);
      setEditingExperience(null);
      setEditFormData({});
      toast.success("Experience updated successfully");
    }
  };

  const handleApprove = (id: string) => {
    onApprove(id);
    toast.success("Experience approved and published");
  };

  const handleReject = (id: string) => {
    onReject(id);
    toast.success("Experience rejected");
  };

  const updateInterviewRound = (index: number, field: 'title' | 'description', value: string) => {
    if (editFormData.interviewRounds) {
      const updatedRounds = [...editFormData.interviewRounds];
      updatedRounds[index] = { ...updatedRounds[index], [field]: value };
      setEditFormData({ ...editFormData, interviewRounds: updatedRounds });
    }
  };

  const addTip = (newTip: string) => {
    if (newTip.trim() && editFormData.tips) {
      const updatedTips = [...editFormData.tips, newTip.trim()];
      setEditFormData({ ...editFormData, tips: updatedTips });
    }
  };

  const removeTip = (index: number) => {
    if (editFormData.tips) {
      const updatedTips = editFormData.tips.filter((_, i) => i !== index);
      setEditFormData({ ...editFormData, tips: updatedTips });
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString();
  };

  const ExperienceCard = ({ experience, showActions = true }: { experience: Experience; showActions?: boolean }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{experience.company} - {experience.role}</CardTitle>
            <p className="text-muted-foreground">{experience.studentName} ({experience.department})</p>
            <p className="text-sm text-muted-foreground">
              Submitted: {formatDate(experience.submittedAt)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant={experience.status === 'approved' ? 'default' : 'secondary'}>
              {experience.status === 'approved' ? 'Approved' : 'Pending'}
            </Badge>
            <Badge variant="outline">{experience.difficulty}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div><strong>Location:</strong> {experience.location}</div>
          <div><strong>Package:</strong> {experience.package}</div>
          <div><strong>Year:</strong> {experience.year}</div>
          <div><strong>Type:</strong> {experience.offerType}</div>
        </div>
        
        <div className="mb-4">
          <strong className="block mb-2">Interview Rounds:</strong>
          <div className="space-y-2">
            {experience.interviewRounds.map((round, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Round {index + 1}
                  </span>
                  <span className="font-medium text-sm">{round.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {round.description.length > 100 
                    ? `${round.description.substring(0, 100)}...`
                    : round.description
                  }
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <strong className="block mb-2">Experience:</strong>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {experience.experience.substring(0, 200)}
            {experience.experience.length > 200 && '...'}
          </p>
        </div>

        <div className="mb-4">
          <strong className="block mb-2">Tips:</strong>
          <ul className="text-sm text-muted-foreground space-y-1">
            {experience.tips.slice(0, 2).map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-4 border-t">
            {experience.status === 'pending' && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => handleApprove(experience.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleReject(experience.id)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => handleEdit(experience)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Experience</DialogTitle>
                </DialogHeader>
                {editingExperience && (
                  <EditForm 
                    experience={editingExperience}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingExperience(null)}
                    updateInterviewRound={updateInterviewRound}
                    addTip={addTip}
                    removeTip={removeTip}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main Site
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">
          Review and manage submitted placement experiences
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pending Review</p>
                <p className="font-bold text-2xl text-foreground">{pendingExperiences.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Approved</p>
                <p className="font-bold text-2xl text-foreground">{approvedExperiences.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Experiences</p>
                <p className="font-bold text-2xl text-foreground">{experiences.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Management */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Review ({pendingExperiences.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedExperiences.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingExperiences.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No pending submissions</h3>
                  <p className="text-muted-foreground">All experiences have been reviewed!</p>
                </CardContent>
              </Card>
            ) : (
              pendingExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="space-y-4">
            {approvedExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EditForm({ 
  experience, 
  formData, 
  setFormData, 
  onSave, 
  onCancel,
  updateInterviewRound,
  addTip,
  removeTip
}: {
  experience: Experience;
  formData: Partial<Experience>;
  setFormData: (data: Partial<Experience>) => void;
  onSave: () => void;
  onCancel: () => void;
  updateInterviewRound: (index: number, field: 'title' | 'description', value: string) => void;
  addTip: (tip: string) => void;
  removeTip: (index: number) => void;
}) {
  const [newTip, setNewTip] = useState("");

  const departments = [
    "Computer Science", "Information Technology", "Electronics", "Mechanical",
    "Electrical", "Civil", "Chemical", "Biotechnology", "MBA", "BBA"
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Student Name</Label>
          <Input
            value={formData.studentName || ''}
            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
          />
        </div>
        <div>
          <Label>Department</Label>
          <Select value={formData.department || ''} onValueChange={(value) => setFormData({...formData, department: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Company</Label>
          <Input
            value={formData.company || ''}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div>
        <div>
          <Label>Role</Label>
          <Input
            value={formData.role || ''}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Location</Label>
          <Input
            value={formData.location || ''}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>
        <div>
          <Label>Package</Label>
          <Input
            value={formData.package || ''}
            onChange={(e) => setFormData({...formData, package: e.target.value})}
          />
        </div>
        <div>
          <Label>Year</Label>
          <Input
            type="number"
            value={formData.year || ''}
            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Difficulty</Label>
          <Select value={formData.difficulty || ''} onValueChange={(value) => setFormData({...formData, difficulty: value as "Easy" | "Medium" | "Hard"})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Offer Type</Label>
          <Select value={formData.offerType || ''} onValueChange={(value) => setFormData({...formData, offerType: value as "Internship" | "Full-time" | "Both"})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Interview Rounds</Label>
        <div className="space-y-3 mt-2">
          {formData.interviewRounds?.map((round, index) => (
            <Card key={index} className="p-3 bg-secondary/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    Round {index + 1}
                  </span>
                </div>
                <div>
                  <Label>Round Title</Label>
                  <Input
                    value={round.title}
                    onChange={(e) => updateInterviewRound(index, 'title', e.target.value)}
                    placeholder="e.g., Technical Interview, Online Assessment"
                  />
                </div>
                <div>
                  <Label>Round Description</Label>
                  <Textarea
                    value={round.description}
                    onChange={(e) => updateInterviewRound(index, 'description', e.target.value)}
                    placeholder="Describe what happened in this round..."
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Label>Experience</Label>
        <Textarea
          value={formData.experience || ''}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          className="min-h-32"
        />
      </div>

      <div>
        <Label>Tips</Label>
        <div className="flex gap-2 mt-2">
          <Input
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            placeholder="Add tip"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTip(newTip), setNewTip(''))}
          />
          <Button type="button" onClick={() => {addTip(newTip); setNewTip('');}}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          {formData.tips?.map((tip, index) => (
            <div key={index} className="flex items-start gap-2 p-2 bg-secondary/30 rounded">
              <span className="text-sm flex-1">{tip}</span>
              <X className="w-4 h-4 cursor-pointer" onClick={() => removeTip(index)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onSave}>Save Changes</Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}