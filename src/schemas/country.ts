import { z } from 'zod';

export const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
  }),
  capital: z.array(z.string()).optional(),
  flags: z
    .object({
      svg: z.string(),
    })
    .optional(),
  population: z.number().optional(),
  continents: z.array(z.string()).default([]),
  maps: z
    .object({
      googleMaps: z.string().url().optional(),
    })
    .optional(),
  independent: z.boolean().optional(),
  latlng: z.tuple([z.number(), z.number()]).optional(),
});

export const CountriesSchema = z.array(CountrySchema);

export const CountryResponseSchema = z.object({
  name: z.string(),
  capital: z.string().optional(),
  flag: z.string(),
  population: z.number().optional(),
  continents: z.array(z.string()),
  mapUrl: z.string().optional(),
  independent: z.boolean().optional(),
  latlng: z.tuple([z.number(), z.number()]).optional(),
});

export const CountriesResponseSchema = z.array(CountryResponseSchema);
