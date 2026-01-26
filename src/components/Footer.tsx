import { Mail, Github, Globe, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          <div className="space-y-4 max-w-xs">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Elevate
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Real interview insights by NITC students. 
              Bridging the gap between preparation and placement.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-colors"><Github size={18} /></a>
              <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-colors"><Globe size={18} /></a>
              <a href="#" className="text-zinc-400 hover:text-emerald-500 transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Platform</h4>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <li><a href="#experiences" className="hover:text-emerald-500 transition-colors">Experiences</a></li>
                <li><a href="#companies" className="hover:text-emerald-500 transition-colors">Companies</a></li>
                <li><a href="#about" className="hover:text-emerald-500 transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Resources</h4>
              <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <li className="flex items-center group cursor-pointer hover:text-emerald-500 transition-colors">
                  Interview Tips <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                </li>
                <li className="flex items-center group cursor-pointer hover:text-emerald-500 transition-colors">
                  Resume Guide <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-zinc-400 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} GDSC NITC</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}