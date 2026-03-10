'use client';

import { motion } from 'framer-motion';
import styles from './HomeHeader.module.css';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import { ANIMATION_CONFIG } from '@/animations/animations';
import { INTRO_DELAYS } from '@/animations/delays';

export default function HomeHeader() {
  return (
    <div className={styles.homeHeader}>
      <motion.div
        {...ANIMATION_CONFIG}
        transition={{
          ...ANIMATION_CONFIG.transition,
          delay: INTRO_DELAYS.TITLE,
        }}
      >
        <MainTitle id="home-page-title">Welcome to Country Explorer</MainTitle>
      </motion.div>

      <div className={styles.pageDescription}>
        <motion.div
          {...ANIMATION_CONFIG}
          transition={{
            ...ANIMATION_CONFIG.transition,
            delay: INTRO_DELAYS.DESCRIPTION_1,
          }}
        >
          <PageDescription id="home-page-description-1">
            Discover the world one country at a time. Browse interactive flags,
            explore detailed country information, and test your knowledge in a
            fun geography game.
          </PageDescription>
        </motion.div>

        <motion.div
          {...ANIMATION_CONFIG}
          transition={{
            ...ANIMATION_CONFIG.transition,
            delay: INTRO_DELAYS.DESCRIPTION_2,
          }}
        >
          <PageDescription id="home-page-description-2">
            Click on any flag below to flip it and reveal the country’s name.
            It’s a simple and visual way to learn and recognize countries from
            around the world.
          </PageDescription>
        </motion.div>
      </div>
    </div>
  );
}
