'use client';

import { useCountries } from '@/hooks/CountriesProvider';
import { useMemo } from 'react';
import { generateQuestions } from '@/utils/generateQuestions';

import Question from './Question/Question';
import Loading from '@/components/Loading/Loading';
import { useQuiz } from '@/utils/useQuiz';
import Result from '@/components/Game/GamePanel/Result/Result';

type Props = {
  continent: string;
  questionCount: number;
};

export default function GamePanel({ continent, questionCount }: Props) {
  const { countries } = useCountries();

  const questions = useMemo(() => {
    if (!countries) return [];
    return generateQuestions(countries, continent, questionCount);
  }, [countries, continent, questionCount]);

  const quiz = useQuiz(questions);

  if (!countries || questions.length === 0) return <Loading />;

  if (quiz.finished) {
    return <Result score={quiz.score} total={quiz.total} />;
  }

  return (
    <Question
      question={quiz.current}
      questionNumber={quiz.index + 1}
      totalQuestions={quiz.total}
      onAnswer={quiz.answer}
    />
  );
}
