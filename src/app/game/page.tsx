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
        <main id="game-page-main">
          {phase === 'start' && (
            <section
              role="region"
              aria-labelledby="game-page-start-title"
              className="container flex-center"
            >
              <MainTitle id="game-page-start-title">
                Countries Quiz 🌍
              </MainTitle>
              <PageDescription id="game-page-start-desc">
                Choose a continent and number of questions. Then guess the
                correct capital of each country.
              </PageDescription>
              <Button
                variant="start"
                size="lg"
                aria-label="Start countries quiz"
                onClick={() => setPhase('setup')}
              >
                Start
              </Button>
            </section>
          )}

          {phase === 'setup' && (
            <GameSetup
              continents={continents}
              selectedContinent={selectedContinent}
              setSelectedContinent={setSelectedContinent}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              onStartGame={() => setPhase('quiz')}
            />
          )}

          {phase === 'quiz' &&
            countries &&
            selectedContinent &&
            questionCount && (
              <GamePanel
                continent={selectedContinent}
                questionCount={questionCount}
                onRestart={() => {
                  setPhase('setup');
                  setSelectedContinent(null);
                  setQuestionCount(null);
                }}
              />
            )}
        </main>
      )}
    </DataLoader>
  );
}
