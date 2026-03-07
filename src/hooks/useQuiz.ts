import { useState } from 'react';
import { QuizQuestion } from '../utils/generateQuestions';

type QuizHook = {
  current: QuizQuestion;
  index: number;
  total: number;
  finished: boolean;
  score: number;
  answer: (correct: boolean) => void;
};

export function useQuiz(questions: QuizQuestion[]): QuizHook {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = questions[index];
  const finished = index >= questions.length;
  const total = questions.length;

  function answer(correct: boolean) {
    if (correct) setScore((s) => s + 1);
    setIndex((i) => i + 1);
  }

  return { current, index, total, finished, score, answer };
}
