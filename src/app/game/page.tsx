'use client';

import { useCountries } from '@/hooks/CountriesProvider';
import DataLoader from '@/components/DataLoader/DataLoader';
import { EMPTY_COUNTRIES_MESSAGE } from '@/constants';
import { getContinents } from '@/utils/getContinents';
import { useState } from 'react';

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
      {() => <div>123</div>}
    </DataLoader>
  );
}
