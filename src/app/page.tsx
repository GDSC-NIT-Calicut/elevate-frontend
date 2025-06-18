import { ExperienceCard } from '@/components/ExperienceCard';
import { CompanyCard } from '@/components/CompanyCard';
import { homeProps } from '@/lib/props';

export default function Home() {
  const { topExps, topCompanies } = homeProps;

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Top Experiences</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {topExps.map(exp => <ExperienceCard key={exp.id} exp={exp} />)}
      </div>

      <h1 className="text-2xl font-bold mb-4">Top Companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topCompanies.map(company => <CompanyCard key={company.id} company={company} />)}
      </div>
    </main>
  );
}
