import { fetchCountries } from '@/lib/fetchCountries';

export async function GET() {
  try {
    const countries = await fetchCountries();
    return Response.json(countries);
  } catch (err) {
    return Response.json(
      { error: `Internal server error ${err}` },
      { status: 500 },
    );
  }
}