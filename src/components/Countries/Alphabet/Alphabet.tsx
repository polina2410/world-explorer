'use client';

import { useState } from 'react';
import styles from './Alphabet.module.css';
import Tooltip from '@/components/Tooltip/Tooltip';
import { ALPHABET } from '@/constants';

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
    <div className={`${styles.alphabet} table`}>
      {ALPHABET.map((letter) => (
        <Tooltip
          key={letter}
          content={`Click to show countries that start with the letter "${letter}"`}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick(letter);
            }}
            className={`${styles.letter} ${activeLetter === letter ? styles.active : ''}`}
          >
            {letter}
          </a>
        </Tooltip>
      ))}
    </div>
  );
}
