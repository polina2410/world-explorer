import { CountriesResponseSchema, CountriesSchema } from '@/schemas/country';
import { CountryResponse } from '@/types/country';

const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 180;

export async function fetchCountries(): Promise<CountryResponse[]> {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,continents,maps,independent',
    { headers: { Accept: 'application/json' }, next: { revalidate: SIX_MONTHS_IN_SECONDS } },
  );

  if (!res.ok) throw new Error(`REST Countries failed: ${res.status}`);

  const raw = CountriesSchema.parse(await res.json());

  const countries = raw
    .filter((c) => c.independent === true)
    .map((c) => ({
      name: c.name.common,
      capital: Array.isArray(c.capital) ? c.capital[0] : '—',
      flag: c.flags?.svg ?? '',
      population: c.population ?? 0,
      continents: c.continents ?? '',
      mapUrl: c.maps?.googleMaps ?? '',
    }));

  CountriesResponseSchema.parse(countries);

  return countries;
}