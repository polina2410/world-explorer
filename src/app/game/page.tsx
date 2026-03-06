'use client';

import MainTitle from '@/components/MainTitle/MainTitle';
import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE, QUESTION_OPTIONS } from '@/constants';
import { getContinents } from '@/utils/getContinents';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import ContinentSelector from '@/components/Game/ContinentSelector/ContinentSelector';

export default function GamePage() {
  const { countries, loading, error } = useCountries();
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [gameStarted, setGameStarted] = useState(false);

  const continents = getContinents(countries);

  return (
    <DataLoader
      data={countries}
      loading={loading}
      error={error}
      emptyMessage={EMPTY_COUNTRIES_MESSAGE}
    >
      {() => (
        <>
          <MainTitle>Guess The Capital</MainTitle>

          {!gameStarted && (
            <>
              <ContinentSelector
                continents={continents}
                selectedContinent={selectedContinent}
                onSelectAction={setSelectedContinent}
              />

              {QUESTION_OPTIONS.map((count) => (
                <Button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  active={questionCount === count}
                >
                  {count} questions
                </Button>
              ))}
              <Button onClick={() => setGameStarted(true)}>Start Game</Button>
            </>
          )}
        </>
      )}
    </DataLoader>
  );
}
