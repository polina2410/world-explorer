import { CountriesResponseSchema, CountriesSchema } from '@/schemas/country';
import { CountryResponse } from '@/types/country';

const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 180;

export async function fetchCountries(): Promise<CountryResponse[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);
  let res: Response;
  try {
    res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,continents,maps,independent',
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: SIX_MONTHS_IN_SECONDS },
        signal: controller.signal,
      }
    );
  } catch (e) {
    throw new Error(`REST Countries network error: ${e}`);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) throw new Error(`REST Countries failed: ${res.status}`);

  let raw: ReturnType<typeof CountriesSchema.parse>;
  try {
    raw = CountriesSchema.parse(await res.json());
  } catch (e) {
    throw new Error(`REST Countries response validation failed: ${e}`);
  }

  const countries = raw
    .filter((c) => c.independent === true)
    .map((c) => ({
      name: c.name.common,
      capital: Array.isArray(c.capital) ? c.capital[0] : '-',
      flag: c.flags?.svg ?? '',
      population: c.population ?? 0,
      continents: c.continents ?? '',
      mapUrl: c.maps?.googleMaps ?? '',
    }));

  try {
    CountriesResponseSchema.parse(countries);
  } catch (e) {
    throw new Error(`Mapped countries failed validation: ${e}`);
  }

  return countries;
}
