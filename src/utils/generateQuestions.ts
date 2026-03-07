export type Country = {
  name: string;
  capital?: string;
  continents: string[];
};

export type QuizQuestion = {
  country: string;
  correct: string;
  options: string[];
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateQuestions(
  countries: Country[],
  continent: string,
  count: number
): QuizQuestion[] {
  // only countries with a capital
  const filtered = countries.filter(
    (c): c is Required<Pick<Country, 'name' | 'capital' | 'continents'>> =>
      !!c.capital && (continent === 'All' || c.continents.includes(continent))
  );

  const selected = shuffle(filtered).slice(0, count);

  return selected.map((country) => {
    // pick 3 wrong capitals
    const wrongCapitals = shuffle(
      filtered.filter((c) => c.name !== country.name).map((c) => c.capital)
    ).slice(0, 3);

    return {
      country: country.name,
      correct: country.capital,
      options: shuffle([country.capital, ...wrongCapitals]),
    };
  });
}
