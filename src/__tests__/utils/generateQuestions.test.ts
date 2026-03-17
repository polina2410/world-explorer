import { describe, it, expect } from 'vitest';
import { generateQuestions } from '@/utils/generateQuestions';
import type { Country } from '@/utils/generateQuestions';

const makeCountries = (names: string[]): Country[] =>
  names.map((name, i) => ({
    name,
    capital: `Capital${i + 1}`,
    continents: ['Europe'],
    flag: `flag-${i}.svg`,
  }));

const europeAndAsia: Country[] = [
  { name: 'France', capital: 'Paris', continents: ['Europe'], flag: 'fr.svg' },
  { name: 'Germany', capital: 'Berlin', continents: ['Europe'], flag: 'de.svg' },
  { name: 'Japan', capital: 'Tokyo', continents: ['Asia'], flag: 'jp.svg' },
  { name: 'China', capital: 'Beijing', continents: ['Asia'], flag: 'cn.svg' },
  { name: 'Italy', capital: 'Rome', continents: ['Europe'], flag: 'it.svg' },
];

describe('generateQuestions', () => {
  it('returns the requested number of questions', () => {
    const countries = makeCountries(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
    const questions = generateQuestions(countries, 'All', 5);
    expect(questions).toHaveLength(5);
  });

  it('returns fewer questions if not enough countries', () => {
    const countries = makeCountries(['A', 'B', 'C']);
    const questions = generateQuestions(countries, 'All', 10);
    expect(questions.length).toBeLessThanOrEqual(3);
  });

  it('each question has exactly 4 options', () => {
    const questions = generateQuestions(europeAndAsia, 'All', 3);
    questions.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('correct answer is always among the options', () => {
    const questions = generateQuestions(europeAndAsia, 'All', 5);
    questions.forEach((q) => {
      expect(q.options).toContain(q.correct);
    });
  });

  it('options have no duplicates', () => {
    const questions = generateQuestions(europeAndAsia, 'All', 5);
    questions.forEach((q) => {
      expect(new Set(q.options).size).toBe(q.options.length);
    });
  });

  it('filters by continent', () => {
    const questions = generateQuestions(europeAndAsia, 'Asia', 2);
    questions.forEach((q) => {
      const country = europeAndAsia.find((c) => c.name === q.country);
      expect(country?.continents).toContain('Asia');
    });
  });

  it('returns all countries when continent is "All"', () => {
    const questions = generateQuestions(europeAndAsia, 'All', 5);
    expect(questions).toHaveLength(5);
  });

  it('excludes countries without a capital', () => {
    const countries: Country[] = [
      { name: 'NoCapital', capital: undefined, continents: ['Europe'], flag: 'x.svg' },
      ...makeCountries(['A', 'B', 'C', 'D']),
    ];
    const questions = generateQuestions(countries, 'All', 4);
    questions.forEach((q) => {
      expect(q.country).not.toBe('NoCapital');
    });
  });

  it('returns empty array when no countries match', () => {
    const questions = generateQuestions(europeAndAsia, 'Antarctica', 5);
    expect(questions).toHaveLength(0);
  });
});
