import { z } from 'zod';
import { CountrySchema, CountryResponseSchema } from '@/schemas/country';

export type Country = z.infer<typeof CountrySchema>;
export type CountryResponse = z.infer<typeof CountryResponseSchema>;
