'use client';

import { createContext, useContext, ReactNode } from 'react';
import { CountryResponse } from '@/types/country';

interface CountriesContextType {
  countries: CountryResponse[];
  loading: false;
  error: null;
}

const CountriesContext = createContext<CountriesContextType>({
  countries: [],
  loading: false,
  error: null,
});

export function CountriesProvider({
  children,
  initialCountries,
}: {
  children: ReactNode;
  initialCountries: CountryResponse[];
}) {
  return (
    <CountriesContext.Provider
      value={{ countries: initialCountries, loading: false, error: null }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export const useCountries = () => useContext(CountriesContext);