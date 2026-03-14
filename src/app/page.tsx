'use client';

import FlagMosaic from '@/components/pages/FlagMosaic/FlagMosaic';
import HomeHeader from '@/components/pages/HomeHeader/HomeHeader';
import { motion } from 'motion/react';
import { fadeUpVariants, pageVariants } from '@/animations/animations';

export default function HomePage() {
  return (
    <motion.main
      id="home-page-main"
      role="main"
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
        <FlagMosaic />
      </motion.section>
    </motion.main>
  );
}
