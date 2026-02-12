'use client';

import { useState } from 'react';
import styles from './Alphabet.module.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
        <a
          key={letter}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick(letter);
          }}
          className={`${styles.letter} ${activeLetter === letter ? styles.active : ''}`}
        >
          {letter}
        </a>
      ))}
    </div>
  );
}
