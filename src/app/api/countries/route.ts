import { CountriesSchema } from '@/schemas/country';
import { CountryResponse } from '@/types/country';

export async function GET() {
  try {
    const res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital',
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return Response.json(
        { error: `REST Countries failed: ${res.status}` },
        { status: 500 }
      );
    }

    const json = await res.json();

    const parsed = CountriesSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid countries data' },
        { status: 500 }
      );
    }

    const countries: CountryResponse[] = parsed.data.map((c) => ({
      name: c.name.common,
      capital: c.capital?.[0] ?? '—',
    }));

    return Response.json(countries);
  } catch (err) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
