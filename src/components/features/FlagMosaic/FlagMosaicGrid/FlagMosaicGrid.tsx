'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FlagMosaicCard from '@/components/features/FlagMosaic/FlagMosaicCard/FlagMosaicCard';
import styles from './FlagMosaicGrid.module.css';
import { Country } from '@/utils/generateQuestions';
import { gridVariants } from '@/animations';
import { useFlagMosaic } from '@/context/FlagMosaicContext';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  countries: Country[];
};

export default function FlagMosaicGrid({ countries }: Props) {
  const { close, state } = useFlagMosaic();
  const gridRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => { if (state.flipped) close(); }, { ref: gridRef, escape: true });

  return (
    <motion.div
      ref={gridRef}
      className={styles.mosaicContainer}
      id="flag-mosaic-container"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <AnimatePresence mode="popLayout">
        {countries.map((country, i) => (
          <FlagMosaicCard key={country.name} country={country} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
