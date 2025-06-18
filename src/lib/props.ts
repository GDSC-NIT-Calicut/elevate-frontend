export const homeProps = {
  topExps: [
    {
      id: 'e1',
      title: 'Software Engineering Intern',
      shortDescription: 'Worked on internal tools at Google',
      experienceDate: '062024',
      verified: true,
    },
    {
      id: 'e2',
      title: 'Research Intern',
      shortDescription: 'AI + ML research at Microsoft',
      experienceDate: '012024',
      verified: false,
    },
  ],
  topCompanies: [
    {
      id: 'c1',
      name: 'Google',
      logo: '/images/google-logo.png',
      slug: 'google',
    },
    {
      id: 'c2',
      name: 'Microsoft',
      logo: '/images/microsoft-logo.png',
      slug: 'microsoft',
    },
  ],
};

export const companiesPageProps = {
  companies: [
    {
      id: 'c1',
      name: 'Google',
      logo: '/images/google-logo.png',
      slug: 'google',
    },
    {
      id: 'c2',
      name: 'Microsoft',
      logo: '/images/microsoft-logo.png',
      slug: 'microsoft',
    },
    {
      id: 'c3',
      name: 'Amazon',
      logo: '/images/amazon-logo.png',
      slug: 'amazon',
    },
  ],
};

export const navbarProps = {
  user: {
    name: 'Vinit',
    role: 'student', // or 'admin', 'moderator'
    avatarUrl: '/images/user-avatar.png',
  },
};

export const companyCardProps = {
  company: {
    id: 'c1',
    name: 'Google',
    logo: '/images/google-logo.png',
    slug: 'google',
  },
};

export const experienceCardProps = {
  exp: {
    id: 'e1',
    title: 'Software Engineering Intern',
    shortDescription: 'Worked on internal tools at Google',
    experienceDate: '062024', // June 2024
    verified: true,
  },
};

