import { describe, it, expect } from 'vitest';
import {
  CountrySchema,
  CountriesSchema,
  CountryResponseSchema,
  CountriesResponseSchema,
} from '@/schemas/country';

describe('CountrySchema', () => {
  it('parses a valid country', () => {
    const input = {
      name: { common: 'France' },
      capital: ['Paris'],
      flags: { svg: 'fr.svg' },
      population: 67000000,
      continents: ['Europe'],
      maps: { googleMaps: 'https://maps.google.com/?q=France' },
      independent: true,
    };
    const result = CountrySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('requires name.common', () => {
    const result = CountrySchema.safeParse({ name: {} });
    expect(result.success).toBe(false);
  });

  it('defaults continents to empty array when missing', () => {
    const result = CountrySchema.safeParse({ name: { common: 'Unknown' } });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.continents).toEqual([]);
  });

  it('allows optional fields to be absent', () => {
    const result = CountrySchema.safeParse({ name: { common: 'Nowhere' } });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.capital).toBeUndefined();
      expect(result.data.flags).toBeUndefined();
      expect(result.data.population).toBeUndefined();
    }
  });

  it('rejects invalid googleMaps url', () => {
    const result = CountrySchema.safeParse({
      name: { common: 'Test' },
      maps: { googleMaps: 'not-a-url' },
    });
    expect(result.success).toBe(false);
  });
});

describe('CountriesSchema', () => {
  it('parses an array of countries', () => {
    const input = [
      { name: { common: 'France' }, continents: ['Europe'] },
      { name: { common: 'Japan' }, continents: ['Asia'] },
    ];
    const result = CountriesSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('parses empty array', () => {
    const result = CountriesSchema.safeParse([]);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toHaveLength(0);
  });

  it('fails if any entry is invalid', () => {
    const result = CountriesSchema.safeParse([{ name: {} }]);
    expect(result.success).toBe(false);
  });
});

describe('CountryResponseSchema', () => {
  it('parses a valid response country', () => {
    const input = {
      name: 'France',
      capital: 'Paris',
      flag: 'fr.svg',
      population: 67000000,
      continents: ['Europe'],
      mapUrl: 'https://maps.google.com/?q=France',
      independent: true,
    };
    const result = CountryResponseSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('requires name and flag', () => {
    const result = CountryResponseSchema.safeParse({ continents: [] });
    expect(result.success).toBe(false);
  });

  it('allows optional fields to be absent', () => {
    const result = CountryResponseSchema.safeParse({
      name: 'Test',
      flag: 'test.svg',
      continents: [],
    });
    expect(result.success).toBe(true);
  });
});

describe('CountriesResponseSchema', () => {
  it('parses array of response countries', () => {
    const input = [
      { name: 'France', flag: 'fr.svg', continents: ['Europe'] },
      { name: 'Japan', flag: 'jp.svg', continents: ['Asia'] },
    ];
    const result = CountriesResponseSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
