// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCountries } from '@/lib/fetchCountries';

const rawCountry = (overrides = {}) => ({
  name: { common: 'France' },
  capital: ['Paris'],
  flags: { svg: 'fr.svg' },
  population: 67000000,
  continents: ['Europe'],
  maps: { googleMaps: 'https://maps.google.com/?q=France' },
  independent: true,
  ...overrides,
});

const mockFetch = (ok: boolean, body: unknown) =>
  vi
    .fn()
    .mockResolvedValue({ ok, status: ok ? 200 : 503, json: async () => body });

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('fetchCountries', () => {
  it('returns transformed countries', async () => {
    vi.stubGlobal('fetch', mockFetch(true, [rawCountry()]));
    const result = await fetchCountries();
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      name: 'France',
      capital: 'Paris',
      flag: 'fr.svg',
      population: 67000000,
      continents: ['Europe'],
      mapUrl: 'https://maps.google.com/?q=France',
    });
  });

  it('filters out non-independent countries', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch(true, [
        rawCountry(),
        rawCountry({ name: { common: 'Kosovo' }, independent: false }),
      ])
    );
    const result = await fetchCountries();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('France');
  });

  it('uses "-" as capital when capital array is missing', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch(true, [rawCountry({ capital: undefined })])
    );
    const result = await fetchCountries();
    expect(result[0].capital).toBe('-');
  });

  it('uses empty string for flag when flags is missing', async () => {
    vi.stubGlobal('fetch', mockFetch(true, [rawCountry({ flags: undefined })]));
    const result = await fetchCountries();
    expect(result[0].flag).toBe('');
  });

  it('uses empty string for mapUrl when maps is missing', async () => {
    vi.stubGlobal('fetch', mockFetch(true, [rawCountry({ maps: undefined })]));
    const result = await fetchCountries();
    expect(result[0].mapUrl).toBe('');
  });

  it('throws when fetch returns a non-ok response', async () => {
    vi.stubGlobal('fetch', mockFetch(false, null));
    await expect(fetchCountries()).rejects.toThrow('503');
  });

  it('throws when fetch itself throws (network error)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network down'))
    );
    await expect(fetchCountries()).rejects.toThrow(
      'REST Countries network error'
    );
  });

  it('throws when the response body fails schema validation', async () => {
    vi.stubGlobal('fetch', mockFetch(true, [{ invalid: 'data' }]));
    await expect(fetchCountries()).rejects.toThrow(
      'REST Countries response validation failed'
    );
  });
});
