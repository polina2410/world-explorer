'use client';

import { useState } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { useCountries } from '@/context/CountriesContext';
import { getContinents } from '@/utils/getContinents';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import QuizStart from '@/components/features/Quiz/QuizStart/QuizStart';
import QuizSetup from '@/components/features/Quiz/QuizSetup/QuizSetup';
import QuizPanel from '@/components/features/Quiz/QuizPanel/QuizPanel';
import Modal from '@/components/UI/Modal/Modal';
import { EMPTY_COUNTRIES_MESSAGE, EXIT_QUIZ_MESSAGE } from '@/constants';
import { motion, AnimatePresence } from 'motion/react';
import { exitFadeUp, fadeUpVariants, pageVariants } from '@/animations';
import { useNavigationGuard } from '@/hooks/useNavigationGuard';

export default function QuizPageClient() {
  const { phase, setPhase, selectedContinent, setSelectedContinent, questionCount, setQuestionCount } = useQuiz();
  const { countries, loading, error } = useCountries();
  const continents = getContinents(countries);

  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNav, setPendingNav] = useState<(() => void) | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useNavigationGuard(phase === 'quiz' && !quizFinished, (proceed) => {
    setPendingNav(() => proceed);
    setShowExitModal(true);
  });

  const handleExitConfirm = () => {
    setShowExitModal(false);
    pendingNav?.();
    setPendingNav(null);
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
    setPendingNav(null);
  };

  return (
    <>
      <DataLoader
        data={countries}
        loading={loading}
        error={error}
        emptyMessage={EMPTY_COUNTRIES_MESSAGE}
      >
        {() => (
          <motion.div
            id="quiz-page-main"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {phase === 'start' && (
                <motion.div
                  key="start"
                  exit={exitFadeUp}
                >
                  <QuizStart />
                </motion.div>
              )}

              {phase === 'setup' && (
                <motion.div
                  key="setup"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit={exitFadeUp}
                >
                  <QuizSetup continents={continents} />
                </motion.div>
              )}

              {phase === 'quiz' && countries && selectedContinent && questionCount && (
                <motion.div
                  key="quiz"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit={exitFadeUp}
                >
                  <QuizPanel
                    continent={selectedContinent}
                    questionCount={questionCount}
                    onFinish={() => setQuizFinished(true)}
                    onRestart={() => {
                      setQuizFinished(false);
                      setPhase('setup');
                      setSelectedContinent(null);
                      setQuestionCount(null);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </DataLoader>

      <Modal
        isOpen={showExitModal}
        message={EXIT_QUIZ_MESSAGE}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />
    </>
  );
}
