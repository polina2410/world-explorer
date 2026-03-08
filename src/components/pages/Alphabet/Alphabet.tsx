'use client';

import { useState } from 'react';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import styles from './Alphabet.module.css';

const ALPHABET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

type AlphabetProps = {
  onSelectAction?: (letter: string | null) => void;
};

export default function Alphabet({ onSelectAction }: AlphabetProps) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const handleClick = (letter: string) => {
    const newLetter = activeLetter === letter ? null : letter; // toggle selection
    setActiveLetter(newLetter);
    onSelectAction?.(newLetter);
  };

  return (
    <div className={styles.alphabet} role="group" aria-label="Alphabet filter">
      {ALPHABET.map((letter) => (
        <Tooltip
          key={letter}
          content={`Click to show countries that start with the letter "${letter}"`}
        >
          <button
            type="button"
            id={`alphabet-letter-${letter}`} // optional id for easier dev tools / testing
            aria-pressed={activeLetter === letter}
            onClick={() => handleClick(letter)}
            className={`${styles.letter} ${
              activeLetter === letter ? styles.active : ''
            }`}
          >
            {letter}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
