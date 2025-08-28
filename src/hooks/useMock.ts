// Mock data for placement experiences with status
import { Experience, User, Company, Tag } from "@/types";

const mockUsers: User[] = [
  {
    id: "1",
    email: "rahul.sharma@nitc.ac.in",
    name: "Rahul Sharma",
    roll_number: "B20CS001",
    department: "Computer Science",
    programme: "B.Tech",
    role: "student",
    is_active: true,
    is_staff: false
  },
  {
    id: "2",
    email: "priya.patel@nitc.ac.in",
    name: "Priya Patel",
    roll_number: "B20CS002",
    department: "Computer Science",
    programme: "B.Tech",
    role: "student",
    is_active: true,
    is_staff: false
  },
  {
    id: "3",
    email: "amit.kumar@nitc.ac.in",
    name: "Amit Kumar",
    roll_number: "B20CS003",
    department: "Computer Science",
    programme: "B.Tech",
    role: "student",
    is_active: true,
    is_staff: false
  }
];

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Google",
    slug: "google",
    logo: "/logos/google.png",
    description: "Google is a multinational technology company that specializes in Internet-related services and products."
  },
  {
    id: "2",
    name: "Microsoft",
    slug: "microsoft",
    logo: "/logos/microsoft.png",
    description: "Microsoft Corporation is an American multinational technology company."
  },
  {
    id: "3",
    name: "Amazon",
    slug: "amazon",
    logo: "/logos/amazon.png",
    description: "Amazon.com, Inc. is an American multinational technology company."
  }
];

const mockTags: Tag[] = [
  {
    id: "1",
    title: "Software Engineering",
    type: { id: "1", name: "Role" }
  },
  {
    id: "2",
    title: "Product Management",
    type: { id: "1", name: "Role" }
  },
  {
    id: "3",
    title: "UX Design",
    type: { id: "2", name: "Domain" }
  }
];

const mockExperiences: Experience[] = [
    {
      id: "1",
      cover_image: "/images/google-interview.jpg",
      title: "Software Engineer Interview Experience at Google",
      role: "Software Engineer",
      short_description: "Comprehensive interview process covering algorithms, system design, and behavioral questions.",
      content: {
        interviewRounds: [
          {
            title: "Online Assessment",
            roundType: 'Online Assessment',
            description: "90-minute coding test with 2 algorithmic problems focusing on data structures and algorithms."
          },
          {
            title: "Technical Interview 1",
            roundType: 'Technical Interview',
            description: "45-minute video call focusing on data structures, coding problems, and system design basics."
          },
          {
            title: "Technical Interview 2", 
            roundType: 'Technical Interview',
            description: "1-hour technical deep dive covering advanced algorithms, coding problems, and detailed discussion about past projects."
          },
          {
            title: "Behavioral Interview",
            roundType: 'Behavioral Interview',
            description: "30-minute discussion with hiring manager about leadership experiences, cultural fit, and motivation."
          }
        ],
        experience: "The interview process was well-structured and challenging. The online assessment focused on data structures and algorithms with medium to hard level problems. The technical interviews were conducted by senior engineers who asked questions about system design, coding problems, and past projects. The behavioral interview was with the hiring manager and focused on leadership experiences and cultural fit. Overall, it was a great learning experience and the interviewers were very supportive throughout the process."
      },
      tips: "Practice coding problems daily on LeetCode and HackerRank. Be prepared to explain your projects in detail with technical depth. Study system design fundamentals - scalability, load balancing, databases. Prepare STAR format answers for behavioral questions. Ask thoughtful questions about the team and role.",
      published_date: "2024-01-15T10:00:00Z",
      experience_date: "2024-01-10",
      visibility: true,
      verified: true,
      compensation: "₹25L per annum",
      job_type: "fte",
      author: mockUsers[0],
      company: mockCompanies[0],
      tags: [mockTags[0]]
    },
    {
      id: "2",
      cover_image: "/images/microsoft-interview.jpg",
      title: "Product Manager Intern Interview at Microsoft",
      role: "Product Manager Intern",
      short_description: "Collaborative interview process focused on product thinking and case studies.",
      content: {
        interviewRounds: [
          {
            title: "Resume Screening",
            roundType: 'Online Assessment',
            description: "Initial screening based on resume, projects, and academic performance."
          },
          {
            title: "Case Study",
            roundType: 'Case Study',
            description: "Design a feature for Microsoft Teams focusing on user needs, success metrics, and implementation roadmap."
          },
          {
            title: "Technical Discussion",
            roundType: 'Other',
            description: "Discussion about technical constraints, working with engineering teams, and understanding of Microsoft's technology stack."
          },
          {
            title: "Final Interview",
            roundType: 'HR Interview',
            description: "Behavioral interview with senior PM covering product thinking, stakeholder management, and cultural fit."
          }
        ],
        experience: "Microsoft's interview process was very collaborative and focused on product thinking. The case study involved designing a feature for Teams, which required understanding user needs, defining metrics, and creating a roadmap. The technical discussion wasn't about coding but rather about understanding technical constraints and working with engineering teams."
      },
      tips: "Understand the product ecosystem of the company. Practice case studies and framework thinking. Be ready to discuss metrics and success measurement. Show examples of cross-functional collaboration.",
      published_date: "2024-01-20T10:00:00Z",
      experience_date: "2024-01-15",
      visibility: true,
      verified: true,
      compensation: "₹1.5L per month",
      job_type: "internship",
      author: mockUsers[1],
      company: mockCompanies[1],
      tags: [mockTags[1]]
    },
    {
      id: "3",
      cover_image: "/images/amazon-interview.jpg",
      title: "Software Development Engineer Interview at Amazon",
      role: "Software Development Engineer",
      short_description: "Intensive interview process emphasizing Amazon's Leadership Principles.",
      content: {
        interviewRounds: [
          {
            title: "Online Assessment",
            roundType: 'Online Assessment',
            description: "Two coding problems and 14 leadership principle questions. Coding problems focused on arrays, strings, and dynamic programming."
          },
          {
            title: "Technical Phone Screen",
            roundType: 'Technical Interview',
            description: "45-minute phone interview with coding problem and behavioral questions. Problem involved tree traversal and optimization."
          },
          {
            title: "Virtual Onsite Loop",
            roundType: 'Technical Interview',
            description: "4 rounds of 1-hour interviews each covering coding, system design, and behavioral questions."
          }
        ],
        experience: "Amazon's interview process heavily emphasized their Leadership Principles. Each round included both technical and behavioral questions. The technical questions were focused on algorithms, data structures, and system design. The behavioral questions required specific examples demonstrating leadership principles like 'Customer Obsession' and 'Ownership'."
      },
      tips: "Study Amazon's 16 Leadership Principles thoroughly. Prepare multiple STAR format examples for each principle. Focus on scalability in system design questions. Practice whiteboard coding without IDE support.",
      published_date: "2024-02-01T10:00:00Z",
      experience_date: "2024-01-25",
      visibility: true,
      verified: true,
      compensation: "₹28L per annum",
      job_type: "fte",
      author: mockUsers[2],
      company: mockCompanies[2],
      tags: [mockTags[0]]
    }
];

export default mockExperiences;