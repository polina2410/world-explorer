import { fetchCountries } from '@/lib/fetchCountries';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const countries = await fetchCountries();
    logger.info('GET /api/countries succeeded', { count: countries.length });
    return Response.json(countries);
  } catch (err) {
    logger.error('GET /api/countries failed', { error: String(err) });
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}