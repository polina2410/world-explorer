'use client';

import FlagMosaic from '@/components/pages/FlagMosaic/FlagMosaic';
import HomeHeader from '@/components/pages/HomeHeader/HomeHeader';

export default function HomePage() {
  return (
    <main id="home-page-main" role="main">
      <section aria-labelledby="home-page-flag-mosaic-header">
        <HomeHeader />
      </section>

      <section aria-labelledby="home-page-flag-mosaic">
        <FlagMosaic />
      </section>
    </main>
  );
}
