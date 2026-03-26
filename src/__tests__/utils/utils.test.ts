import { describe, it, expect } from 'vitest';
import {
  formatPopulation,
  calculatePercentage,
  formatList,
} from '@/utils/utils';

describe('formatPopulation', () => {
  it('formats large numbers with commas', () => {
    expect(formatPopulation(1000000)).toBe('1,000,000');
  });

  it('formats small numbers without commas', () => {
    expect(formatPopulation(999)).toBe('999');
  });

  it('formats zero', () => {
    expect(formatPopulation(0)).toBe('0');
  });

  it('formats millions', () => {
    expect(formatPopulation(83200000)).toBe('83,200,000');
  });
});

describe('calculatePercentage', () => {
  it('calculates 100% when value equals total', () => {
    expect(calculatePercentage(10, 10)).toBe(100);
  });

  it('calculates 50%', () => {
    expect(calculatePercentage(5, 10)).toBe(50);
  });

  it('calculates 0% when value is 0', () => {
    expect(calculatePercentage(0, 10)).toBe(0);
  });

  it('rounds to nearest integer', () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });

  it('returns 100 for perfect score', () => {
    expect(calculatePercentage(7, 7)).toBe(100);
  });

  it('returns 0 when total is 0', () => {
    expect(calculatePercentage(5, 0)).toBe(0);
  });
});

// noinspection JSVoidFunctionReturnValueUsed
describe('formatList', () => {
  it('joins multiple items with comma', () => {
    expect(formatList(['Europe', 'Asia'])).toBe('Europe, Asia');
  });

  it('returns single item without comma', () => {
    expect(formatList(['Africa'])).toBe('Africa');
  });

  it('returns em dash for empty array', () => {
    expect(formatList([])).toBe('-');
  });

  it('joins three items', () => {
    expect(formatList(['A', 'B', 'C'])).toBe('A, B, C');
  });
});
