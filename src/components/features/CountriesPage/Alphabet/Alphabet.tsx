'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './Alphabet.module.css';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { SCALE, SPRING_INTERACTIVE } from '@/animations';

const ALPHABET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

type AlphabetProps = {
  onSelectAction?: (letter: string | null) => void;
};

export default function Alphabet({ onSelectAction }: AlphabetProps) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const handleClick = (letter: string) => {
    const newLetter = activeLetter === letter ? null : letter;
    setActiveLetter(newLetter);
    onSelectAction?.(newLetter);
  };

  return (
    <div
      className={`table ${styles.wrapper}`}
      role="group"
      aria-label="Select a letter to filter countries"
    >
      {ALPHABET.map((letter) => (
        <motion.div
          key={letter}
          whileHover={{ scale: SCALE.HOVER }}
          whileTap={{ scale: SCALE.PRESS }}
          transition={SPRING_INTERACTIVE}
          style={{ display: 'inline-block' }}
        >
          <Tooltip
            content={`Click to show countries that start with the letter "${letter}"`}
          >
            <button
              type="button"
              aria-pressed={activeLetter === letter}
              onClick={() => handleClick(letter)}
              className={`${styles.letter} ${activeLetter === letter ? styles.active : ''}`}
            >
              {letter}
            </button>
          </Tooltip>
        </motion.div>
      ))}
    </div>
  );
}
