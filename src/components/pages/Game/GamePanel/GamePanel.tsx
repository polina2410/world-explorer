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

  if (!countries || questions.length === 0) return <Loading />;

  if (quiz.finished) {
    return (
      <Result score={quiz.score} total={quiz.total} onRestart={onRestart} />
    );
  }

  return (
    <div className="container">
      <Question
        question={quiz.current}
        questionNumber={quiz.index + 1}
        totalQuestions={quiz.total}
        onAnswer={quiz.answer}
      />
    </div>
  );
}
