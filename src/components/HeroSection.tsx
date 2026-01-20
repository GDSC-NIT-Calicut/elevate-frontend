import { TrendingUp, Users, Building2 } from "lucide-react";
import { Card } from "./ui/card";
import { LogoMarquee } from "./ui/LogoMarquee";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-green-2 to-green-1 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-green-12 mb-4">
            Crack your <span className="text-[#11B981]">Dream Job</span> with advice from your seniors. 
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover real interview experiences, placement stories, and insider tips from seniors who landed amazing opportunities at top companies worldwide. 
          </p>
        </div>

        <LogoMarquee />
      </div>
    </section>
  );
}