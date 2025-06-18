'use client';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    logo: string;
    slug: string;
  };
}

export const CompanyCard = ({ company }: CompanyCardProps) => (
  <Link href={`/companies/${company.slug}`} className="flex items-center space-x-4 p-4 border rounded-lg shadow hover:bg-gray-50 transition">
    <Image src={company.logo} alt={company.name} width={40} height={40} className="rounded-full" />
    <span className="text-lg font-medium">{company.name}</span>
  </Link>
);
