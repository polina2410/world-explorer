'use client';

import { createContext, useContext, ReactNode } from 'react';
import { CountryResponse } from '@/types/country';

interface CountriesContextType {
  countries: CountryResponse[];
  error: string | null;
}

const CountriesContext = createContext<CountriesContextType>({
  countries: [],
  error: null,
});

export function CountriesProvider({
  children,
  initialCountries,
  initialError = null,
}: {
  children: ReactNode;
  initialCountries: CountryResponse[];
  initialError?: string | null;
}) {
  return (
    <CountriesContext.Provider value={{ countries: initialCountries, error: initialError }}>
      {children}
    </CountriesContext.Provider>
  );
}

export const useCountries = () => useContext(CountriesContext);