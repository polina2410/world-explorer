'use client';

import { motion } from 'framer-motion';
import FlagMosaicCard from '@/components/pages/FlagMosaicCard/FlagMosaicCard';
import styles from './FlagMosaicGrid.module.css';
import { Country } from '@/utils/generateQuestions';

type Props = {
  countries: Country[];
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.008,
    },
  },
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
