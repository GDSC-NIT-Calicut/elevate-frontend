export const students = [
  {
    slug: "john-doe",
    name: "John Doe",
    email: "john@nitc.ac.in",
    department: "CSE",
    programme: "BTech",
    experiences: ["exp-1"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },
];

export const companies = [
  {
    id: "google",
    name: "Google",
    slug: "google",
    logo: "/logos/google.png",
    description: "A leading tech company.",
  },
];

export const experiences = [
  {
    id: "exp-1",
    title: "Intern @ Google",
    role: "Software Engineer Intern",
    student: "john-doe",
    company: "google",
    shortDescription: "Worked on scalable backend systems.",
    content: `# Experience\nI worked on microservices...`,
    publishedDate: "01062025",
    experienceDate: "052024",
    tags: ["paid", "remote", "summer"],
    verified: true,
    type: "internship",
    public: true,
  },
];
