'use client';

import { useCountries } from '@/context/CountriesContext';
import { useEffect, useMemo } from 'react';
import { generateQuestions, QuizQuestion } from '@/utils/generateQuestions';
import Question from '@/components/features/Quiz/Question/Question';
import Loading from '@/components/UI/Loading/Loading';
import { useQuiz } from '@/hooks/useQuiz';
import Result from '@/components/features/Quiz/Result/Result';
import { motion } from 'motion/react';
import { containerVariants, fadeUpVariants } from '@/animations';

type QuizPanelProps = {
  continent: string;
  questionCount: number;
  onRestart: () => void;
  onFinish?: () => void;
};

export default function QuizPanel({
  continent,
  questionCount,
  onRestart,
  onFinish,
}: QuizPanelProps) {
  const { countries } = useCountries();
  const questions: QuizQuestion[] = useMemo(() => {
    if (!countries) return [];
    return generateQuestions(countries, continent, questionCount);
  }, [countries, continent, questionCount]);

  const quiz = useQuiz(questions);

  useEffect(() => {
    if (quiz.finished) onFinish?.();
  }, [onFinish, quiz.finished]);

  if (!countries || questions.length === 0)
    return <Loading aria-label="Loading quiz questions" />;

  if (quiz.finished) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUpVariants}>
          <Result
            score={quiz.score}
            total={quiz.total}
            onRestart={onRestart}
            aria-label={`Quiz finished. Your score is ${quiz.score} out of ${quiz.total}`}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.main
      className="container"
      id="quiz-panel"
      role="region"
      aria-labelledby="quiz-heading"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 id="quiz-heading" className="sr-only">
        {continent} Quiz
      </h2>

      <motion.div variants={fadeUpVariants}>
        <Question
          question={quiz.current}
          questionNumber={quiz.index + 1}
          totalQuestions={quiz.total}
          onAnswer={quiz.answer}
          onRestart={onRestart}
        />
      </motion.div>
    </motion.main>
  );
}
