'use client';

import { motion, AnimatePresence } from 'motion/react';
import FlagMosaicCard from '@/components/pages/FlagMosaicCard/FlagMosaicCard';
import styles from './FlagMosaicGrid.module.css';
import { Country } from '@/utils/generateQuestions';
import { gridVariants } from '@/animations/animations';

type Props = {
  countries: Country[];
};

export default function FlagMosaicGrid({ countries }: Props) {
  return (
    <motion.div
      className={styles.mosaicContainer}
      id="flag-mosaic-container"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <AnimatePresence mode="popLayout">
        {countries.map((country) => (
          <FlagMosaicCard key={country.name} country={country} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
