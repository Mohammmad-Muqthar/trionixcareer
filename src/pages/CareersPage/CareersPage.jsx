import CareersHero from "./components/CareersHero/CareersHero";
import CareersCulture from "./components/CareersCulture/CareersCulture";
import CareersTeamValues from "./components/CareersTeamValues/CareersTeamValues";
import CareersCTA from "./components/CareersCTA/CareersCTA";

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <CareersCulture />
      <CareersTeamValues />
      <CareersCTA />
    </main>
  );
}