import { Search, Menu, Plus, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (view: 'main' | 'submit' | 'admin') => void;
  currentView: 'main' | 'submit' | 'admin';
}

export function Header({ onSearch, onNavigate, currentView }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: 'main' | 'submit' | 'admin') => {
    onNavigate(view);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header className="bg-green-1 border-b border-green-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigate('main')}
            >
              <div className="w-10 h-10 bg-green-9 rounded-lg flex items-center justify-center">
                <span className="text-green-contrast font-bold">C</span>
              </div>
              <div>
                <h1 className="font-semibold text-green-12">Elevate</h1>
                <p className="text-xs text-green-11">By GDSC NITC</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavigate('main')}
              className={`transition-colors ${
                currentView === 'main' 
                  ? 'text-green-9' 
                  : 'text-green-11 hover:text-green-9'
              }`}
            >
              Experiences
            </button>

            <a href="#companies" className="text-green-11 hover:text-green-9 transition-colors">
              Companies
            </a>
            <a href="#about" className="text-green-11 hover:text-green-9 transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {currentView === 'main' && (
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search companies or roles..."
                  className="pl-10 w-64"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}
            
            <Button 
              onClick={() => handleNavigate('submit')}
              className="hidden sm:flex"
              variant={currentView === 'submit' ? 'yellow' : 'outline'}
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Experience
            </Button>
            
            <Button 
              onClick={() => handleNavigate('admin')}
              variant={currentView === 'admin' ? 'default' : 'outline'}
              size="sm"
              className="hidden sm:block"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Search on mobile */}
                  {currentView === 'main' && (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-11 w-4 h-4" />
                      <Input
                        placeholder="Search companies or roles..."
                        className="pl-10"
                        onChange={(e) => onSearch(e.target.value)}
                      />
                    </div>
                  )}
                  
                  {/* Navigation Items */}
                  <div className="space-y-2">
                    <Button 
                      variant={currentView === 'main' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => handleNavigate('main')}
                    >
                      Experiences
                    </Button>
                    
                    <Button 
                      variant={currentView === 'submit' ? 'yellow' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => handleNavigate('submit')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Share Experience
                    </Button>
                    
                    <Button 
                      variant={currentView === 'admin' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => handleNavigate('admin')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </div>
                  
                  {/* Quick Links */}
                  <div className="border-t pt-4 space-y-2">
                    <h3 className="font-medium text-sm text-green-11 mb-2">Quick Links</h3>

                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Companies
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      About
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}