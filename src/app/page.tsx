'use client';

import MainTitle from '@/components/UI/MainTitle/MainTitle';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import FlagMosaic from '@/components/pages/FlagMosaic/FlagMosaic';

export default function HomePage() {
  return (
    <main id="home-page-main">
      <MainTitle id="home-page-title">Welcome to Country Explorer</MainTitle>

      <PageDescription id="home-page-description-1">
        Discover the world one country at a time. Browse interactive flags,
        explore detailed country information, and test your knowledge in a fun
        geography game.
      </PageDescription>

      <PageDescription id="home-page-description-2">
        Click on any flag below to flip it and reveal the country’s name. It’s a
        simple and visual way to learn and recognize countries from around the
        world.
      </PageDescription>

      <FlagMosaic id="home-page-flag-mosaic" />
    </main>
  );
}
