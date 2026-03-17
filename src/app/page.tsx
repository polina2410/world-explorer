'use client';

import FlagMosaic from '@/components/features/FlagMosaic/FlagMosaic';
import HomeHeader from '@/components/features/HomeHeader/HomeHeader';
import { motion } from 'motion/react';
import { fadeUpVariants, pageVariants } from '@/animations';

export default function HomePage() {
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
        <FlagMosaic />
      </motion.section>
    </motion.div>
  );
}
