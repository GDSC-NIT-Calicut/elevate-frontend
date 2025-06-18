type ExperienceCardProps = {
  exp: {
    id: string;
    title: string;
    shortDescription: string;
    experienceDate: string; // Format: "MMYY"
    verified: boolean;
  };
};

type CompanyCardProps = {
  company: {
    id: string;
    name: string;
    logo: string; // URL or relative path
    slug: string;
  };
};

type NavbarProps = {
  user?: {
    name: string;
    role: 'admin' | 'student' | 'moderator';
    avatarUrl?: string;
  };
};

type ExperiencePageParams = {
  params: {
    id: string; // experience id (e.g. 'e1')
  };
};

type Experience = {
  id: string;
  title: string;
  shortDescription: string;
  content: string; // markdown
  experienceDate: string;
  publishedDate: string;
  verified: boolean;
  student: string; // student.slug
  company: string; // company.id
};

type Student = {
  slug: string;
  name: string;
  batch: string;
  image: string;
};

type Company = {
  id: string;
  name: string;
  logo: string;
};

