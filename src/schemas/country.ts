import { z } from 'zod';

export const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
  }),
  capital: z.array(z.string()).optional(),
});

export const CountriesSchema = z.array(CountrySchema);

export const CountryResponseSchema = z.object({
  name: z.string(),
  capital: z.string(),
});

export const CountriesResponseSchema = z.array(CountryResponseSchema);
