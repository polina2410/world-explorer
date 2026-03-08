'use client';

import Button from '@/components/UI/Button/Button';
import styles from './GameSetup.module.css';
import { QUESTION_OPTIONS } from '@/constants';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';

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
    <div className={`${styles.setup} container`}>
      <div className={styles.menuCard}>
        <div className={styles.step}>
          <SecondaryTitle>Choose continent:</SecondaryTitle>

          <div className={styles.buttons}>
            <Button
              size="sm"
              active={selectedContinent === 'All'}
              onClick={() => setSelectedContinent('All')}
            >
              All
            </Button>

            {continents.map((continent) => (
              <Button
                size="sm"
                key={continent}
                active={selectedContinent === continent}
                onClick={() => setSelectedContinent(continent)}
              >
                {continent}
              </Button>
            ))}
          </div>
        </div>

        {selectedContinent && (
          <div className={styles.step}>
            <SecondaryTitle>Choose number of questions:</SecondaryTitle>

            <div className={styles.buttons}>
              {QUESTION_OPTIONS.map((option) => (
                <Button
                  size="sm"
                  key={option}
                  active={questionCount === option}
                  onClick={() => setQuestionCount(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {isReadyToStart && (
          <div className={styles.startQuizButton}>
            <Button size="lg" active onClick={onStartGame}>
              Start Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
