'use client';

import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import styles from './Result.module.css';
import { useConfetti } from '@/hooks/useConfetti';
import Button from '@/components/UI/Button/Button';
import { calculatePercentage } from '@/utils/utils';

type ResultProps = {
  score: number;
  total: number;
  onRestart: () => void;
};

type ResultThreshold = {
  min: number;
  max: number;
  message: string;
  className: string;
};

const RESULT_THRESHOLDS: ResultThreshold[] = [
  {
    min: 100,
    max: 100,
    message: 'Perfect Score!',
    className: styles.excellent,
  },
  { min: 70, max: 99, message: 'Great Job!', className: styles.great },
  { min: 0, max: 69, message: 'Keep Practicing!', className: styles.tryAgain },
];

export default function Result({ score, total, onRestart }: ResultProps) {
  const percentage = calculatePercentage(score, total);

  useConfetti(percentage);

  const threshold = RESULT_THRESHOLDS.find(
    (t) => percentage >= t.min && percentage <= t.max
  );

  return (
    <div id="quiz-result" className={`${styles.resultWrapper} flex-center`}>
      <SecondaryTitle id="quiz-result-title">🎉 Quiz Finished!</SecondaryTitle>

      <p
        id="quiz-score"
        className={styles.score}
        role="status"
        aria-live="polite"
      >
        Score: <strong className={styles.highlight}>{score}</strong> /{' '}
        <strong className={styles.highlight}>{total}</strong> (
        <strong className={styles.highlight}>{percentage}%</strong>)
      </p>

      {threshold && (
        <p
          id="quiz-result-message"
          className={threshold.className}
          aria-label={`Result feedback: ${threshold.message}`}
        >
          {threshold.message}
        </p>
      )}

      <Button
        id="quiz-restart-button"
        variant="start"
        size="md"
        onClick={onRestart}
        aria-label="Restart quiz"
      >
        Start again
      </Button>
    </div>
  );
}
