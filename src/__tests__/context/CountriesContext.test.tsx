import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { CountriesProvider, useCountries } from '@/context/CountriesContext';
import { ReactNode } from 'react';

const mockCountries = [
  { name: 'France', capital: 'Paris', flag: 'fr.svg', population: 67000000, continents: ['Europe'], mapUrl: '' },
  { name: 'Japan', capital: 'Tokyo', flag: 'jp.svg', population: 125000000, continents: ['Asia'], mapUrl: '' },
];

const wrapper = ({ children }: { children: ReactNode }) => (
  <CountriesProvider>{children}</CountriesProvider>
);

describe('CountriesContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('starts in loading state', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    const { result } = renderHook(() => useCountries(), { wrapper });
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('sets countries and stops loading on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockCountries,
    }));

    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.countries).toEqual(mockCountries);
    expect(result.current.error).toBeNull();
  });

  it('sets error and stops loading when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Network error');
    expect(result.current.countries).toBeNull();
  });

  it('sets error when response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const { result } = renderHook(() => useCountries(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Failed to fetch countries');
  });
});
