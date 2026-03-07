import { CountryResponse } from '@/types/country';

export type QuizQuestion = {
  country: string;
  correct: string;
  options: string[];
};

function shuffle<T>(arr: T[]) {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function generateQuestions(
  countries: CountryResponse[],
  continent: string,
  count: number
): {
  country: string;
  correct: string | undefined;
  options: (string | undefined)[];
}[] {
  const filtered = countries.filter(
    (c) =>
      c.capital && (continent === 'All' || c.continents.includes(continent))
  );

  const selected = shuffle(filtered).slice(0, count);

  return selected.map((country) => {
    const wrong = shuffle(
      filtered.filter((c) => c.name !== country.name && c.capital)
    )
      .slice(0, 3)
      .map((c) => c.capital);

    return {
      country: country.name,
      correct: country.capital,
      options: shuffle([...wrong, country.capital]),
    };
  });
}
