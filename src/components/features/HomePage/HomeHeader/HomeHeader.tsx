'use client';

import MainTitle from '@/components/UI/MainTitle/MainTitle';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import { motion } from 'motion/react';
import { containerVariants, fadeUpVariants } from '@/animations';

export default function HomeHeader() {
  return (
    <motion.div
      className="page stack"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUpVariants}>
        <MainTitle id="home-page-title">Welcome to Country Explorer!</MainTitle>
      </motion.div>

      <motion.div variants={containerVariants}>
        <motion.div variants={fadeUpVariants}>
          <PageDescription id="home-page-description-1">
            Discover the world one country at a time. Browse interactive flags,
            explore detailed country information, and test your knowledge in a
            fun geography game.
          </PageDescription>
        </motion.div>

        <motion.div variants={fadeUpVariants}>
          <PageDescription id="home-page-description-2">
            Click on any flag below to flip it and reveal the country’s name.
            It’s a simple and visual way to learn and recognize countries from
            around the world.
          </PageDescription>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
