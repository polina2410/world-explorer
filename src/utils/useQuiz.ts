import { useState } from 'react';
import { QuizQuestion } from '@/utils/generateQuestions';

export function useQuiz(
  questions:
    | any[]
    | {
        country: string;
        correct: string | undefined;
        options: (string | undefined)[];
      }[]
) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = questions[index];

  function answer(isCorrect: boolean) {
    if (isCorrect) setScore((s) => s + 1);
    setIndex((i) => i + 1);
  }

  const finished = index >= questions.length;

  return {
    current,
    index,
    score,
    finished,
    total: questions.length,
    answer,
  };
}
