export function getContinents(
  countries: { continents: string[] }[] | null | undefined
): string[] {
  if (!countries) return [];

  return Array.from(new Set(countries.flatMap((c) => c.continents))).sort();
}
