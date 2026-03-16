'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './FlagMosaicCard.module.css';
import { useFlagMosaic } from '@/context/FlagMosaicContext';

type Props = {
  country: {
    name: string;
    flag: string;
  };
  row: number;
  index: number;
  hasInitialAnimationPlayed: boolean;
  totalCountries: number;
  setHasInitialAnimationPlayed: (value: boolean) => void;
};

export default function FlagMosaicCard({
  country,
  row,
  index,
  hasInitialAnimationPlayed,
  totalCountries,
  setHasInitialAnimationPlayed,
}: Props) {
  const { state, flip, close } = useFlagMosaic();

  const isFlipped = state.flipped === country.name;
  const isDimmed = state.flipped && state.flipped !== country.name;

  const handleClick = () => {
    if (isFlipped) {
      close();
    } else {
      flip(country.name);
    }
  };

  return (
    <motion.div
      id={`flag-card-${country.name}`}
      className={`${styles.flagCard} ${
        isFlipped ? styles.active : ''
      } ${isDimmed ? styles.dimmed : ''}`}
      initial={!hasInitialAnimationPlayed ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        !hasInitialAnimationPlayed
          ? { duration: 0.3, delay: row * 0.1 }
          : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (!hasInitialAnimationPlayed && index === totalCountries - 1) {
          setHasInitialAnimationPlayed(true);
        }
      }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
    >
      <div className={`${styles.flagInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.flagFront}>
          <div className={`${styles.flagImageWrapper} flex-center`}>
            <Image
              src={country.flag}
              alt={country.name}
              fill
              className={styles.flagImage}
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 120px"
            />
          </div>
        </div>

        <div className={`${styles.flagBack} flex-center`}>{country.name}</div>
      </div>
    </motion.div>
  );
}
