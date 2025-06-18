'use client';

import Link from "next/link";

export interface NavbarProps {
  variant?: 'blue' | 'white';
}

export const Navbar = ({ variant }: NavbarProps) => (
  <nav className={`flex justify-between items-center p-4 border-b shadow-sm ${variant === 'blue' ? 'bg-blue-400' : 'bg-white'} text-black`}>
    <Link href={'/'} className="text-xl">Elevate NITC</Link>
    <div className="Links flex gap-3 ">
      <Link href={'/companies'} className={`font-sans ${variant==='blue' ?  'text-white ' : 'text-elevate-blue-400' }`}>Companies</Link>
      <Link href={'/experiences'} className={`font-sans ${variant==='blue' ?  'text-white ' : 'text-elevate-blue-400' }`}>Experiences</Link>
    </div>
  </nav>  
);