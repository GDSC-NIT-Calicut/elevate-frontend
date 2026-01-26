import { Search, Menu, Plus, Shield } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { LoginButton } from "./LoginButton";
import Link from "next/link";

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (view: 'main' | 'submit' | 'admin') => void;
  currentView?: 'main' | 'submit' | 'admin';
}
export function Header({ onSearch, onNavigate, currentView }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: 'main' | 'submit' | 'admin') => {
    onNavigate(view); 
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate('main')}
          >
            <div className="w-8 h-8 bg-[#11B981] rounded-md flex items-center justify-center">
              <span className="text-white font-semibold">E</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 leading-none">Elevate</h1>
              <p className="text-xs text-gray-500 -mt-0.5">By GDSC NITC</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/experiences" className="text-[#11B981] font-medium">
              Experiences
            </Link>
            <Link href="/companies" className="text-gray-600 hover:text-gray-900 transition">
              Companies
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">
              About
            </Link>
          </nav>

          {currentView === 'main' && (
            <div className="relative hidden md:flex w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search companies or roles..."
                className="pl-10 rounded-full bg-gray-100 border-0 text-sm"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
}
