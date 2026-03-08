'use client';

import { useCountries } from '@/hooks/CountriesProvider';
import { useMemo } from 'react';
import { generateQuestions, QuizQuestion } from '@/utils/generateQuestions';
import Question from '@/components/pages/Game/Question/Question';
import Loading from '@/components/UI/Loading/Loading';
import { useQuiz } from '@/hooks/useQuiz';
import Result from '@/components/pages/Game/Result/Result';

type GamePanelProps = {
  continent: string;
  questionCount: number;
  onRestart: () => void;
};

export default function GamePanel({
  continent,
  questionCount,
  onRestart,
}: GamePanelProps) {
  const { countries } = useCountries();

  const questions: QuizQuestion[] = useMemo(() => {
    if (!countries) return [];
    return generateQuestions(countries, continent, questionCount);
  }, [countries, continent, questionCount]);

  const quiz = useQuiz(questions);

  if (!countries || questions.length === 0)
    return <Loading aria-label="Loading quiz questions" />;

  if (quiz.finished) {
    return (
      <Result
        score={quiz.score}
        total={quiz.total}
        onRestart={onRestart}
        aria-label={`Quiz finished. Your score is ${quiz.score} out of ${quiz.total}`}
      />
    );
  }

  return (
    <main
      className="container"
      id="game-panel"
      role="region"
      aria-labelledby="quiz-heading"
    >
      <h2 id="quiz-heading" className="sr-only">
        {continent} Quiz
      </h2>

      <Question
        question={quiz.current}
        questionNumber={quiz.index + 1}
        totalQuestions={quiz.total}
        onAnswer={quiz.answer}
      />
    </main>
  );
}
