import { CountriesResponseSchema, CountriesSchema } from '@/schemas/country';

export async function GET() {
  try {
    const res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,continents,maps,independent',
      { headers: { Accept: 'application/json' }, cache: 'no-store' }
    );

    if (!res.ok) {
      return Response.json(
        { error: `REST Countries failed: ${res.status}` },
        { status: 500 }
      );
    }

    const raw = CountriesSchema.parse(await res.json());
    const independentCountries = raw.filter((c) => c.independent === true);

    const countries = independentCountries.map((c) => ({
      name: c.name.common,
      capital: Array.isArray(c.capital) ? c.capital[0] : '—',
      flag: c.flags?.svg ?? '',
      population: c.population ?? 0,
      continents: c.continents ?? '',
      mapUrl: c.maps?.googleMaps ?? '',
    }));

    CountriesResponseSchema.parse(countries);

    return Response.json(countries);
  } catch (err) {
    return Response.json(
      { error: `Internal server error ${err}` },
      { status: 500 }
    );
  }
}
