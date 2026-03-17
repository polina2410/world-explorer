'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './Alphabet.module.css';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { SCALE } from '@/animations/animations';

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    letter: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(letter);
    }
  };

  return (
    <div
      className={`flex-wrap table flex-between`}
      role="group"
      aria-label="Select a letter to filter countries"
    >
      {ALPHABET.map((letter) => (
        <motion.div
          key={letter}
          whileHover={{ scale: SCALE.HOVER }}
          whileTap={{ scale: SCALE.PRESS }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{ display: 'inline-block' }}
        >
          <Tooltip
            content={`Click to show countries that start with the letter "${letter}"`}
          >
            <a
              href="#"
              role="button"
              aria-pressed={activeLetter === letter}
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                handleClick(letter);
              }}
              onKeyDown={(e) => handleKeyDown(e, letter)}
              className={`${styles.letter} ${activeLetter === letter ? styles.active : ''}`}
            >
              {letter}
            </a>
          </Tooltip>
        </motion.div>
      ))}
    </div>
  );
}
