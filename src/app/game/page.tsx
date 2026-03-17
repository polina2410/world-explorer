'use client';

import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useCountries } from '@/context/CountriesContext';
import { getContinents } from '@/utils/getContinents';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import GameStart from '@/components/features/Game/GameStart/GameStart';
import GameSetup from '@/components/features/Game/GameSetup/GameSetup';
import GamePanel from '@/components/features/Game/GamePanel/GamePanel';
import Modal from '@/components/UI/Modal/Modal';
import { EMPTY_COUNTRIES_MESSAGE, EXIT_QUIZ_MESSAGE } from '@/constants';
import { motion, AnimatePresence } from 'motion/react';
import { exitFadeUp, fadeUpVariants, pageVariants } from '@/animations';
import { useNavigationGuard } from '@/hooks/useNavigationGuard';

export default function GamePage() {
  const { phase, setPhase, selectedContinent, setSelectedContinent, questionCount, setQuestionCount } = useGame();
  const { countries, loading, error } = useCountries();
  const continents = getContinents(countries);

  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNav, setPendingNav] = useState<(() => void) | null>(null);

  useNavigationGuard(phase === 'quiz', (proceed) => {
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
            id="game-page-main"
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
                  <GameStart />
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
                  <GameSetup continents={continents} />
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
                  <GamePanel
                    continent={selectedContinent}
                    questionCount={questionCount}
                    onRestart={() => {
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
