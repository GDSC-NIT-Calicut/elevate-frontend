import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-green-9 text-green-contrast">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-contrast rounded-lg flex items-center justify-center">
                <span className="text-green-9 font-bold">C</span>
              </div>
              <div>
                <h3 className="font-semibold">Elevate</h3>
                <p className="text-sm opacity-80">By GDSC NITC</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4 max-w-md">
              Empowering students with real placement experiences and interview insights 
              to help them land their dream jobs at top companies.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>XYZ Engineering College, Tech City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>placements@xyzcollege.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#experiences" className="opacity-80 hover:opacity-100 transition-opacity">
                  Browse Experiences
                </a>
              </li>

              <li>
                <a href="#companies" className="opacity-80 hover:opacity-100 transition-opacity">
                  Partner Companies
                </a>
              </li>
              <li>
                <a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  Interview Tips
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  Resume Templates
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  Coding Practice
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center">
                  Career Guidance
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-contrast/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 Elevate - By GDSC NITC. All rights reserved.</p>
          <p className="mt-2">
            Built with ❤️ for students, by students
          </p>
        </div>
      </div>
    </footer>
  );
}