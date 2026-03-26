'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import styles from './FlagMosaicCard.module.css';
import { SCALE, SPRING_CARD, SPRING_LAYOUT, CARD_STAGGER_INCREMENT, CARD_STAGGER_MAX_DELAY } from '@/animations';
import { useState } from 'react';

type Props = {
  country: {
    name: string;
    flag: string;
  };
  index: number;
  isFlipped: boolean;
  isDimmed: boolean;
  flip: (name: string) => void;
  close: () => void;
};

const FlagMosaicCard = memo(function FlagMosaicCard({ country, index, isFlipped, isDimmed, flip, close }: Props) {

  const [mounted, setMounted] = useState(false);

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
      whileHover={isFlipped ? {} : { scale: 1.06, y: -5 }}
      whileTap={isFlipped ? {} : { scale: 0.96, y: 0 }}
      transition={{
        ...SPRING_CARD,
        delay: mounted ? 0 : Math.min(index * CARD_STAGGER_INCREMENT, CARD_STAGGER_MAX_DELAY),
        layout: SPRING_LAYOUT,
        scale: { type: 'spring', stiffness: 220, damping: 18 },
        y: { type: 'spring', stiffness: 220, damping: 18 },
      }}
      onAnimationComplete={() => setMounted(true)}
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
});

export default FlagMosaicCard;
