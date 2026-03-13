'use client';

import Button from '@/components/UI/Button/Button';
import styles from './GameSetup.module.css';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';

type GameSetupProps = {
  continents: string[];
  selectedContinent: string | null;
  setSelectedContinent: (continent: string) => void;
  questionCount: number | null;
  setQuestionCount: (questionCount: number) => void;
  onStartGame: () => void;
};

export const QUESTION_OPTIONS = [5, 10, 20];

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
    <div className={'section container flex-center'} id="game-setup">
      <div className={styles.menuCard} id="game-setup-card">
        <div className={styles.step} id="step-select-continent">
          <SecondaryTitle id="secondary-title-continents">
            Choose continent:
          </SecondaryTitle>

          <div
            className={styles.buttons}
            id="continent-buttons"
            role="group"
            aria-labelledby="secondary-title-continents"
          >
            <Button
              id="continent-button-all"
              aria-label="Select all continents"
              size="sm"
              active={selectedContinent === 'All'}
              onClick={() => setSelectedContinent('All')}
            >
              All
            </Button>

            {continents.map((continent) => (
              <Button
                id={`continent-button-${continent}`}
                aria-label={`Select continent ${continent}`}
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
          <div className={styles.step} id="step-select-questions">
            <SecondaryTitle id="secondary-title-questions">
              Choose number of questions:
            </SecondaryTitle>

            <div
              className={styles.buttons}
              id="question-count-buttons"
              role="group"
              aria-labelledby="secondary-title-questions"
            >
              {QUESTION_OPTIONS.map((option) => (
                <Button
                  id={`question-button-${option}`}
                  size="sm"
                  key={option}
                  active={questionCount === option}
                  aria-label={`Select ${option} questions`}
                  onClick={() => setQuestionCount(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {isReadyToStart && (
          <div className={styles.startQuizButton} id="start-quiz-wrapper">
            <Button
              id="start-quiz-button"
              aria-label="Start Quiz"
              size="lg"
              active
              onClick={onStartGame}
            >
              Start Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
