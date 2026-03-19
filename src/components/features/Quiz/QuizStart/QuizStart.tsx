'use client';

import { motion } from 'motion/react';
import { containerVariants, exitFadeUp, fadeUpVariants } from '@/animations';
import { useQuiz } from '@/context/QuizContext';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import Button from '@/components/UI/Button/Button';

export default function QuizStart() {
  const { setPhase } = useQuiz();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={exitFadeUp}
      role="region"
      aria-labelledby="quiz-page-start-title"
      className="container flex-center stack page"
    >
      <motion.div variants={fadeUpVariants}>
        <MainTitle id="quiz-page-start-title">Countries Quiz 🌍</MainTitle>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <PageDescription id="quiz-page-start-desc">
          Choose a region and number of questions. Then guess the correct
          capital of each country.
        </PageDescription>
      </motion.div>

      <motion.div variants={fadeUpVariants}>
        <Button
          variant="start"
          size="lg"
          aria-label="Start countries quiz"
          onClick={() => setPhase('setup')}
        >
          Start
        </Button>
      </motion.div>
    </motion.section>
  );
}
