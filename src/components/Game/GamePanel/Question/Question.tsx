'use client';

import { useState } from 'react';
import Button from '@/components/Button/Button';
import PageDescription from '@/components/PageDescription/PageDescription';
import SecondaryTitle from '@/components/SecondaryTitle/SecondaryTitle';
import styles from './Question.module.css';
import { ANSWER_DELAY } from '@/constants';

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

  function handleClick(option: string) {
    setSelected(option);

    const correct = option === question.correct;

    setTimeout(() => {
      setSelected(null);
      onAnswer(correct);
    }, ANSWER_DELAY);
  }

  function getVariant(option: string) {
    if (!selected) return 'default';

    if (option === question.correct) return 'success';

    if (option === selected && option !== question.correct) return 'danger';

    return 'default';
  }

  const progressPercent = (questionNumber / totalQuestions) * 100;

  return (
    <div className={styles.questionContainer}>
      <PageDescription>
        Question {questionNumber} / {totalQuestions}
      </PageDescription>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercent}%` }}
        />
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
