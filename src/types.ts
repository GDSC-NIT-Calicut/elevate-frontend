export type ExperienceCardProps = {
  exp: {
    id: string;
    title: string;
    role: string;
    short_description: string;
    content: any; // JSONField
    tips: string;
    published_date: string;
    experience_date: string;
    visibility: boolean;
    verified: boolean;
    compensation: string;
    job_type: 'fte' | 'internship' | 'research' | 'other';
    author: User;
    company: Company;
    tags: Tag[];
  };
};

export type User = {
  id: string;
  email: string;
  backup_email?: string;
  name: string;
  roll_number?: string;
  department?: string;
  programme?: string;
  role: 'student' | 'spoc' | 'pr' | 'admin' | 'other';
  is_active: boolean;
  is_staff: boolean;
};

export type TagType = {
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  title: string;
  type?: TagType;
};

export type Rounds = {
  title: string;
  roundType: 'Online Assessment' | 'Technical Interview' | 'Behavioral Interview' | 'HR Interview' | 'Case Study' | 'Technical Discussion' | 'Other';
  description: string;
};

export type Experience = {
  id: string;
  cover_image?: string;
  title: string;
  role: string;
  short_description: string;
  content: any; // JSONField
  tips: string;
  published_date: string;
  experience_date: string;
  visibility: boolean;
  verified: boolean;
  compensation: string;
  job_type: 'fte' | 'internship' | 'research' | 'other';
  author: User;
  company: Company;
  tags: Tag[];
};


export type CompanyCardProps = {
  company: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
  };
};

export type NavbarProps = {
  user?: {
    name: string;
    role: 'admin' | 'student' | 'moderator';
    avatarUrl?: string;
  };
};

export type ExperiencePageParams = {
  params: {
    id: string; // experience id (e.g. 'e1')
  };
};


export type Student = {
  slug: string;
  name: string;
  batch: string;
  image: string;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
};

