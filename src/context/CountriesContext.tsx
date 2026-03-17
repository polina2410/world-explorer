'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CountryResponse } from '@/types/country';
import { API_ROUTES } from '@/constants/routes';

interface CountriesContextType {
  countries: CountryResponse[] | null;
  loading: boolean;
  error: string | null;
}

const CountriesContext = createContext<CountriesContextType>({
  countries: null,
  loading: true,
  error: null,
});

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<CountryResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_ROUTES.countries)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch countries');
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountriesContext.Provider>
  );
}

export const useCountries = () => useContext(CountriesContext);
