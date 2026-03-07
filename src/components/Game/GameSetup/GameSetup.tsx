'use client';

import Button from '@/components/Button/Button';
import styles from './GameSetup.module.css';
import { QUESTION_OPTIONS } from '@/constants';
import SecondaryTitle from '@/components/SecondaryTitle/SecondaryTitle';

type GameSetupProps = {
  continents: string[];
  selectedContinent: string | null;
  setSelectedContinent: (continent: string) => void;
  questionCount: number | null;
  setQuestionCount: (questionCount: number) => void;
  onStartGame: () => void;
};

export default function GameSetup({
  continents,
  selectedContinent,
  setSelectedContinent,
  questionCount,
  setQuestionCount,
  onStartGame,
}: GameSetupProps) {
  const isReadyToStart = selectedContinent !== null && questionCount !== null;

  return (
    <div className={styles.setup}>
      <SecondaryTitle>Choose continent:</SecondaryTitle>

      <div className={styles.buttons}>
        <Button
          size="md"
          active={selectedContinent === 'All'}
          onClick={() => setSelectedContinent('All')}
        >
          All
        </Button>

        {continents.map((continent) => (
          <Button
            size="md"
            key={continent}
            active={selectedContinent === continent}
            onClick={() => setSelectedContinent(continent)}
          >
            {continent}
          </Button>
        ))}
      </div>

      {selectedContinent && (
        <>
          <SecondaryTitle>Choose number of questions:</SecondaryTitle>
          <div className={styles.buttons}>
            {QUESTION_OPTIONS.map((option) => (
              <Button
                size="md"
                key={option}
                active={questionCount === option}
                onClick={() => setQuestionCount(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      )}
      {isReadyToStart && (
        <div className={styles.startQuizButton}>
          <Button size="md" onClick={onStartGame}>
            Start Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
