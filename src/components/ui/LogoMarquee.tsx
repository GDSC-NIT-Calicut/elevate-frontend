import React from "react";

const LOGOS = [
  { name: "Google", url: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Meta", url: "https://cdn.simpleicons.org/meta/0668E1" },
  { name: "Google", url: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Netflix", url: "https://cdn.simpleicons.org/netflix/E50914" },
  { name: "Google", url: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Apple", url: "https://cdn.simpleicons.org/apple/000000" },
  { name: "Spotify", url: "https://cdn.simpleicons.org/spotify/1DB954" },
  { name: "Meta", url: "https://cdn.simpleicons.org/meta/0668E1" },
];

export function LogoMarquee() {

  const displayLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full bg-white py-10 overflow-hidden group">

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
      `}} />

      <div className="animate-marquee hover:[animation-play-state:paused] gap-12 px-6">
        {displayLogos.map((logo, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 flex items-center justify-center w-32 h-12"
          >
            <img
              src={logo.url}
              alt={logo.name}
              className="h-full w-auto object-contain transition-all duration-500 
                         grayscale opacity-30 
                         group-hover:grayscale-0 group-hover:opacity-100 hover:!scale-125 cursor-pointer"
            />
          </div>
        ))}
      </div>


      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
}