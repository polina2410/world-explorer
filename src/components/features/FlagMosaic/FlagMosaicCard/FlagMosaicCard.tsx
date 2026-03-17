'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import styles from './FlagMosaicCard.module.css';
import { useFlagMosaic } from '@/context/FlagMosaicContext';
import { SCALE, SPRING_CARD, SPRING_LAYOUT, CARD_STAGGER_INCREMENT, CARD_STAGGER_MAX_DELAY } from '@/animations';
import { useRef, useEffect } from 'react';

type Props = {
  country: {
    name: string;
    flag: string;
  };
  index: number;
};

export default function FlagMosaicCard({ country, index }: Props) {
  const { state, flip, close } = useFlagMosaic();

  const isFlipped = state.flipped === country.name;
  const isDimmed = Boolean(state.flipped && state.flipped !== country.name);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
  }, []);

  const handleClick = () => {
    if (isFlipped) close();
    else flip(country.name);
  };

  return (
    <motion.div
      id={`flag-card-${country.name}`}
      className={`${styles.flagCard} ${isFlipped ? styles.active : ''} ${
        isDimmed ? styles.dimmed : ''
      }`}
      layout
      initial={{ opacity: 0, y: 12, scale: SCALE.ENTER }}
      animate={{ opacity: 1, y: 0, scale: isFlipped ? SCALE.ACTIVE : SCALE.BASIC }}
      exit={{ opacity: 0, scale: SCALE.PRESS, transition: { duration: 0.15 } }}
      whileHover={{ scale: isFlipped ? SCALE.ACTIVE : SCALE.HOVER_LG }}
      whileTap={{ scale: SCALE.PRESS }}
      transition={{
        ...SPRING_CARD,
        delay: mountedRef.current ? 0 : Math.min(index * CARD_STAGGER_INCREMENT, CARD_STAGGER_MAX_DELAY),
        layout: SPRING_LAYOUT,
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
