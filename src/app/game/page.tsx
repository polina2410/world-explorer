'use client';

import { useGame } from '@/context/GameContext';
import { useCountries } from '@/hooks/CountriesProvider';
import { getContinents } from '@/utils/getContinents';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import GameStart from '@/components/pages/Game/GameStart/GameStart';
import GameSetup from '@/components/pages/Game/GameSetup/GameSetup';
import GamePanel from '@/components/pages/Game/GamePanel/GamePanel';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';
import { motion, AnimatePresence } from 'motion/react';
import { exitFadeUp, fadeUpVariants, pageVariants } from '@/animations/animations';

export default function GamePage() {
  const { phase, setPhase, selectedContinent, setSelectedContinent, questionCount, setQuestionCount } = useGame();
  const { countries, loading, error } = useCountries();
  const continents = getContinents(countries);

  return (
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
  );
}
