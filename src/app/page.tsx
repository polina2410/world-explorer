import MainTitle from '@/components/MainTitle/MainTitle';
import PageDescription from '@/components/PageDescription/PageDescription';
import FlagMosaic from '@/components/FlagMosaic/FlagMosaic';
import SectionTitle from '@/components/FeaturesSection/SectionTitle/SectionTitle';

export default function HomePage() {
  return (
    <main>
      <MainTitle>Welcome to Country Explorer</MainTitle>

      <PageDescription>
        Discover the world one country at a time. Browse interactive flags,
        explore detailed country information, and test your knowledge in a fun
        geography game.
      </PageDescription>

      <SectionTitle>Explore the Flags</SectionTitle>

      <PageDescription>
        Click on any flag below to flip it and reveal the country’s name. It’s a
        simple and visual way to learn and recognize countries from around the
        world.
      </PageDescription>
      <FlagMosaic />
    </main>
  );
}
