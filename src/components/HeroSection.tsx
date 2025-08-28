import { TrendingUp, Users, Building2 } from "lucide-react";
import { Card } from "./ui/card";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-green-2 to-green-1 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-12 mb-4">
            Your Gateway to Career Success
          </h1>
          <p className="text-xl text-green-11 max-w-3xl mx-auto mb-8">
            Discover real interview experiences, placement stories, and insider tips from your seniors who landed amazing opportunities at top companies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center bg-green-1 border-green-6">
            <div className="w-12 h-12 bg-green-4 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-green-9" />
            </div>
            <h3 className="font-semibold text-green-12 mb-2">150+ Companies</h3>
            <p className="text-green-11">From startups to Fortune 500 companies</p>
          </Card>

          <Card className="p-6 text-center bg-green-1 border-yellow-500">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-yellow-700" />
            </div>
            <h3 className="font-semibold text-green-12 mb-2">500+ Experiences</h3>
            <p className="text-green-11">Real stories from your seniors</p>
          </Card>

          <Card className="p-6 text-center bg-green-1 border-green-6">
            <div className="w-12 h-12 bg-green-4 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-9" />
            </div>
            <h3 className="font-semibold text-green-12 mb-2">95% Success Rate</h3>
            <p className="text-green-11">Students who used our platform</p>
          </Card>
        </div>
      </div>
    </section>
  );
}