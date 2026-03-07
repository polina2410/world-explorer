'use client';

import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';
import { getContinents } from '@/utils/getContinents';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import PageDescription from '@/components/PageDescription/PageDescription';
import MainTitle from '@/components/MainTitle/MainTitle';
import GameSetup from '@/components/Game/GameSetup/GameSetup';
import GamePanel from '@/components/Game/GamePanel/GamePanel';

export default function GamePage() {
  type GamePhase = 'start' | 'setup' | 'quiz';

  const { countries, loading, error } = useCountries();
  const [phase, setPhase] = useState<GamePhase>('start');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [questionCount, setQuestionCount] = useState<number | null>(null);

  const continents = getContinents(countries);

  function handleRestart() {
    setSelectedContinent(null);
    setQuestionCount(null);
    setPhase('setup');
  }

  return (
    <DataLoader
      data={countries}
      loading={loading}
      error={error}
      emptyMessage={EMPTY_COUNTRIES_MESSAGE}
    >
      {() => (
        <div className="container flex-center startScreen">
          {phase === 'start' && (
            <>
              <MainTitle>Countries Quiz 🌍</MainTitle>
              <PageDescription>
                Choose a continent and number of questions. Then guess the
                correct capital of each country.
              </PageDescription>
              <Button
                variant="start"
                size="lg"
                onClick={() => setPhase('setup')}
              >
                Start
              </Button>
            </>
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
                onRestart={handleRestart}
              />
            )}
        </div>
      )}
    </DataLoader>
  );
}
