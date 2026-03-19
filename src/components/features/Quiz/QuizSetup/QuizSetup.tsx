'use client';

import Button from '@/components/UI/Button/Button';
import styles from './QuizSetup.module.css';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import { motion } from 'motion/react';
import { containerVariants, fadeUpVariants } from '@/animations';
import { useQuiz } from '@/context/QuizContext';

type QuizSetupProps = {
  continents: string[];
};

export const QUESTION_OPTIONS = [5, 10, 20];

export default function QuizSetup({ continents }: QuizSetupProps) {
  const { selectedContinent, setSelectedContinent, questionCount, setQuestionCount, setPhase } = useQuiz();
  const isReadyToStart = selectedContinent !== null && questionCount !== null;

  return (
    <motion.div
      className="section container flex-center"
      id="quiz-setup"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={`${styles.menuCard} stack`}
        id="quiz-setup-card"
        variants={fadeUpVariants}
      >
        <motion.div
          className={styles.step}
          id="step-select-continent"
          variants={fadeUpVariants}
        >
          <SecondaryTitle id="secondary-title-continents">
            Choose continent:
          </SecondaryTitle>

          <motion.div
            className={`${styles.buttons} flex-center flex-wrap`}
            id="continent-buttons"
            role="group"
            aria-labelledby="secondary-title-continents"
            variants={containerVariants}
          >
            <motion.div variants={fadeUpVariants}>
              <Button
                id="continent-button-all"
                aria-label="Select all continents"
                size="sm"
                active={selectedContinent === 'All'}
                onClick={() => setSelectedContinent('All')}
              >
                All
              </Button>
            </motion.div>

            {continents.map((continent) => (
              <motion.div key={continent} variants={fadeUpVariants}>
                <Button
                  id={`continent-button-${continent}`}
                  aria-label={`Select continent ${continent}`}
                  size="sm"
                  active={selectedContinent === continent}
                  onClick={() => setSelectedContinent(continent)}
                >
                  {continent}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {selectedContinent && (
          <motion.div
            className={styles.step}
            id="step-select-questions"
            variants={fadeUpVariants}
          >
            <SecondaryTitle id="secondary-title-questions">
              Choose number of questions:
            </SecondaryTitle>

            <motion.div
              className={`${styles.buttons} flex-center flex-wrap`}
              id="question-count-buttons"
              role="group"
              aria-labelledby="secondary-title-questions"
              variants={containerVariants}
            >
              {QUESTION_OPTIONS.map((option) => (
                <motion.div key={option} variants={fadeUpVariants}>
                  <Button
                    id={`question-button-${option}`}
                    size="sm"
                    active={questionCount === option}
                    aria-label={`Select ${option} questions`}
                    onClick={() => setQuestionCount(option)}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {isReadyToStart && (
          <motion.div
            className="flex-center"
            id="start-quiz-wrapper"
            variants={fadeUpVariants}
          >
            <Button
              id="start-quiz-button"
              aria-label="Start Quiz"
              size="lg"
              active
              onClick={() => setPhase('quiz')}
            >
              Start Quiz
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
