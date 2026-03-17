'use client';

import { motion } from 'framer-motion';
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
    >
      {countries.map((country) => (
        <FlagMosaicCard key={country.name} country={country} />
      ))}
    </motion.div>
  );
}
