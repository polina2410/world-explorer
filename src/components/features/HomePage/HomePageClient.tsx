'use client';

import { Suspense } from 'react';
import FlagMosaic from '@/components/features/HomePage/FlagMosaic';
import { motion } from 'motion/react';
import { fadeUpVariants, pageVariants } from '@/animations';
import HomeHeader from '@/components/features/HomePage/HomeHeader/HomeHeader';

export default function HomePageClient() {
  return (
    <motion.div
      id="home-page-main"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={fadeUpVariants}
        aria-labelledby="home-page-flag-mosaic-header"
      >
        <HomeHeader />
      </motion.section>

      <motion.section
        variants={fadeUpVariants}
        aria-labelledby="home-page-flag-mosaic"
      >
        <Suspense>
          <FlagMosaic />
        </Suspense>
      </motion.section>
    </motion.div>
  );
}
