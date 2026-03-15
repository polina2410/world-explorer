'use client';

import { useGame } from '@/context/GameContext';
import { useCountries } from '@/hooks/CountriesProvider';
import { getContinents } from '@/utils/getContinents';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import GameSetup from '@/components/pages/Game/GameSetup/GameSetup';
import GamePanel from '@/components/pages/Game/GamePanel/GamePanel';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import Button from '@/components/UI/Button/Button';
import { motion } from 'motion/react';
import {
  containerVariants,
  fadeUpVariants,
  pageVariants,
} from '@/animations/animations';

export default function GamePage() {
  const {
    phase,
    setPhase,
    selectedContinent,
    setSelectedContinent,
    questionCount,
    setQuestionCount,
  } = useGame();
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
        <motion.main
          id="game-page-main"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {phase === 'start' && (
            <motion.section
              variants={containerVariants}
              role="region"
              aria-labelledby="game-page-start-title"
              className="container flex-center stack page"
            >
              <motion.div variants={fadeUpVariants}>
                <MainTitle id="game-page-start-title">
                  Countries Quiz 🌍
                </MainTitle>
              </motion.div>

              <motion.div variants={fadeUpVariants}>
                <PageDescription id="game-page-start-desc">
                  Choose a region and number of questions. Then guess the
                  correct capital of each country.
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
          )}

          {phase === 'setup' && (
            <motion.div variants={fadeUpVariants}>
              <GameSetup
                continents={continents}
                selectedContinent={selectedContinent}
                setSelectedContinent={setSelectedContinent}
                questionCount={questionCount}
                setQuestionCount={setQuestionCount}
                onStartGame={() => setPhase('quiz')}
              />
            </motion.div>
          )}

          {phase === 'quiz' &&
            countries &&
            selectedContinent &&
            questionCount && (
              <motion.div variants={fadeUpVariants}>
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
        </motion.main>
      )}
    </DataLoader>
  );
}
