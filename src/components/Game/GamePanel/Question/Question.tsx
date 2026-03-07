'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import PageDescription from '@/components/PageDescription/PageDescription';
import SecondaryTitle from '@/components/SecondaryTitle/SecondaryTitle';
import styles from './Question.module.css';

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
};

export default function Question({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(Math.round((questionNumber / totalQuestions) * 100));
  }, [questionNumber, totalQuestions]);

  function handleClick(option: string) {
    setSelected(option);
    const correct = option === question.correct;

    setTimeout(() => {
      setSelected(null);
      onAnswer(correct);
    }, 600);
  }

  function getVariant(option: string) {
    if (!selected) return 'default';
    if (option === question.correct) return 'success';
    if (option === selected && option !== question.correct) return 'danger';
    return 'default';
  }

  return (
    <div>
      <PageDescription>
        Question {questionNumber} / {totalQuestions}
      </PageDescription>

      <div className={styles.progressWrapper}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <SecondaryTitle>
        What is the capital of {question.country}?
      </SecondaryTitle>

      <div className={styles.optionsWrapper}>
        {question.options.map((option) => (
          <Button
            key={option}
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
