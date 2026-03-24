import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { CountriesProvider, useCountries } from '@/context/CountriesContext';
import { ReactNode } from 'react';

const mockCountries = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', population: 67000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', population: 125000000, continents: ['Asia'], mapUrl: '' },
];

const wrapper = ({ children }: { children: ReactNode }) => (
  <CountriesProvider initialCountries={mockCountries}>{children}</CountriesProvider>
);

describe('CountriesContext', () => {
  it('provides initialCountries via context', () => {
    const { result } = renderHook(() => useCountries(), { wrapper });
    expect(result.current.countries).toEqual(mockCountries);
  });

  it('error is null by default', () => {
    const { result } = renderHook(() => useCountries(), { wrapper });
    expect(result.current.error).toBeNull();
  });

  it('exposes initialError via context', () => {
    const errorWrapper = ({ children }: { children: ReactNode }) => (
      <CountriesProvider initialCountries={[]} initialError="fetch failed">{children}</CountriesProvider>
    );
    const { result } = renderHook(() => useCountries(), { wrapper: errorWrapper });
    expect(result.current.error).toBe('fetch failed');
  });

  it('provides empty array when no countries given', () => {
    const emptyWrapper = ({ children }: { children: ReactNode }) => (
      <CountriesProvider initialCountries={[]}>{children}</CountriesProvider>
    );
    const { result } = renderHook(() => useCountries(), { wrapper: emptyWrapper });
    expect(result.current.countries).toEqual([]);
  });
});