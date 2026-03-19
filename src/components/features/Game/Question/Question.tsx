'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/UI/Button/Button';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import styles from './Question.module.css';
import Modal from '@/components/UI/Modal/Modal';
import { QuizQuestion } from '@/utils/generateQuestions';
import { calculatePercentage } from '@/utils/utils';
import { ResetIcon } from '@/components/icons/ResetIcon';
import { containerVariants, fadeUpVariants } from '@/animations';
import { ANSWER_REVEAL_DELAY_MS, RESTART_QUIZ_MESSAGE } from '@/constants';

type QuestionProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  onRestart: () => void;
};

export default function Question({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onRestart,
}: QuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progress = calculatePercentage(questionNumber, totalQuestions);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [question]);

  function handleClick(option: string) {
    setSelected(option);
    const correct = option === question.correct;

    timeoutRef.current = setTimeout(() => {
      setSelected(null);
      onAnswer(correct);
    }, ANSWER_REVEAL_DELAY_MS);
  }

  function getVariant(option: string) {
    if (!selected) return 'default';
    if (option === question.correct) return 'success';
    if (option === selected && option !== question.correct) return 'danger';
    return 'default';
  }

  return (
    <div id="question-panel" className="container page">
      <Modal
        isOpen={showResetModal}
        message={RESTART_QUIZ_MESSAGE}
        onCancel={() => setShowResetModal(false)}
        onConfirm={() => {
          setShowResetModal(false);
          onRestart();
        }}
      />

      <div className={styles.header}>
        <div className={styles.questionBadge}>
          <span className={styles.questionCurrent}>{questionNumber}</span>
          <span className={styles.questionSeparator}>/</span>
          <span>{totalQuestions}</span>
        </div>

        <div className={styles.progressWrapper} id="question-progress-wrapper">
          <motion.div
            id="question-progress-bar"
            className={styles.progressBar}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <button
          type="button"
          aria-label="Restart quiz"
          className={styles.resetButton}
          onClick={() => setShowResetModal(true)}
        >
          <ResetIcon />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionNumber}
          className={styles.questionCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <SecondaryTitle id="question-text">
            What is the capital of{' '}
            <span className={styles.countryHighlight}>{question.country}</span>?
          </SecondaryTitle>

          <motion.div
            className={styles.optionsWrapper}
            id="question-options"
            role="radiogroup"
            aria-labelledby="question-text"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {question.options.map((option) => (
              <motion.div key={option} variants={fadeUpVariants} className={styles.optionItem}>
                <Button
                  id={`question-option-${option}`}
                  role="radio"
                  aria-checked={selected === option}
                  variant={getVariant(option)}
                  size="md"
                  active={selected === option}
                  disabled={!!selected}
                  onClick={() => handleClick(option)}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
