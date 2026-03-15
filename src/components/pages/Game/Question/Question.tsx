'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/UI/Button/Button';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import styles from './Question.module.css';
import Modal from '@/components/UI/Modal/Modal';

export type QuizQuestion = {
  country: string;
  correct: string;
  options: string[];
};

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
  const [progress, setProgress] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    setProgress(Math.round((questionNumber / totalQuestions) * 100));
  }, [questionNumber, totalQuestions]);

  function handleClick(option: string) {
    setSelected(option);
    const correct = option === question.correct;

    setTimeout(() => {
      setSelected(null);
      onAnswer(correct);
    }, 1000);
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
        message="Are you sure you want to restart the quiz?"
        onCancel={() => setShowResetModal(false)}
        onConfirm={() => {
          setShowResetModal(false);
          onRestart();
        }}
      />

      <div className="flex-between">
        <PageDescription id="question-number">
          Question {questionNumber} / {totalQuestions}
        </PageDescription>

        <button
          type="button"
          aria-label="Reset selection"
          className={styles.resetButton}
          onClick={() => setShowResetModal(true)}
        >
          ⟳
        </button>
      </div>

      <div className={styles.progressWrapper} id="question-progress-wrapper">
        <div
          id="question-progress-bar"
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <SecondaryTitle id="question-text">
        What is the capital of {question.country}?
      </SecondaryTitle>

      <div
        className={styles.optionsWrapper}
        id="question-options"
        role="radiogroup"
        aria-labelledby="question-text"
      >
        {question.options.map((option) => (
          <Button
            id={`question-option-${option}`}
            key={option}
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
        ))}
      </div>
    </div>
  );
}
