'use client';

import Link from "next/link";

export interface NavbarProps {
  variant?: 'blue' | 'white';
}

export const Navbar = ({ variant = 'white' }: NavbarProps) => {
  const isBlue = variant === 'blue';
  const textColor = isBlue ? 'text-white' : 'text-elevate-blue-400';

  return (
    <nav
      className={`flex justify-between items-center p-4 border-b shadow-sm 
        ${isBlue ? 'bg-blue-400' : 'bg-white'} text-black`}
    >
      <Link href="/" className="text-2xl font-semibold font-sans">
        Elevate NITC
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/companies" className={`font-sans ${textColor}`}>
          Companies
        </Link>
        <Link href="/experiences" className={`font-sans ${textColor}`}>
          Experiences
        </Link>
      </div>
    </nav>
  );
};
