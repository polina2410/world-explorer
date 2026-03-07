import MainTitle from '@/components/UI/MainTitle/MainTitle';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import FlagMosaic from '@/components/pages/FlagMosaic/FlagMosaic';

export default function HomePage() {
  return (
    <main>
      <MainTitle>Welcome to Country Explorer</MainTitle>

      <PageDescription>
        Discover the world one country at a time. Browse interactive flags,
        explore detailed country information, and test your knowledge in a fun
        geography game.
      </PageDescription>

      <PageDescription>
        Click on any flag below to flip it and reveal the country’s name. It’s a
        simple and visual way to learn and recognize countries from around the
        world.
      </PageDescription>
      <FlagMosaic />
    </main>
  );
}
