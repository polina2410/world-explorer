import { z } from 'zod';
import { CountryResponseSchema } from '@/schemas/country';

export type CountryResponse = z.infer<typeof CountryResponseSchema>;
