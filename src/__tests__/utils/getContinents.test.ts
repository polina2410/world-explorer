import { describe, it, expect } from 'vitest';
import { getContinents } from '@/utils/getContinents';

describe('getContinents', () => {
  it('returns empty array for null', () => {
    expect(getContinents(null)).toEqual([]);
  });

  it('returns empty array for undefined', () => {
    expect(getContinents(undefined)).toEqual([]);
  });

  it('returns empty array for empty list', () => {
    expect(getContinents([])).toEqual([]);
  });

  it('returns sorted unique continents', () => {
    const countries = [
      { continents: ['Europe'] },
      { continents: ['Asia'] },
      { continents: ['Europe'] },
    ];
    expect(getContinents(countries)).toEqual(['Asia', 'Europe']);
  });

  it('flattens multiple continents per country', () => {
    const countries = [
      { continents: ['Europe', 'Asia'] },
      { continents: ['Africa'] },
    ];
    expect(getContinents(countries)).toEqual(['Africa', 'Asia', 'Europe']);
  });

  it('deduplicates across countries', () => {
    const countries = [
      { continents: ['Americas'] },
      { continents: ['Americas'] },
      { continents: ['Oceania'] },
    ];
    expect(getContinents(countries)).toEqual(['Americas', 'Oceania']);
  });
});
