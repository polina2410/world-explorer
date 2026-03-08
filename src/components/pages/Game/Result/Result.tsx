'use client';

import SecondaryTitle from '@/components/UI/SecondaryTitle/SecondaryTitle';
import styles from './Result.module.css';
import { useConfetti } from '@/hooks/useConfetti';
import Button from '@/components/UI/Button/Button';

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
  const percentage = Math.round((score / total) * 100);

  useConfetti(percentage);

  const threshold = RESULT_THRESHOLDS.find(
    (t) => percentage >= t.min && percentage <= t.max
  );

  return (
    <div className={`${styles.resultWrapper} flex-center`}>
      <SecondaryTitle>🎉 Quiz Finished!</SecondaryTitle>
      <p className={styles.score}>
        Score: <strong className={styles.highlight}>{score}</strong> /{' '}
        <strong className={styles.highlight}>{total}</strong> (
        <strong className={styles.highlight}>{percentage}%</strong>)
      </p>
      {threshold && <p className={threshold.className}>{threshold.message}</p>}
      <Button variant="start" size="md" onClick={onRestart}>
        Start again
      </Button>
    </div>
  );
}
