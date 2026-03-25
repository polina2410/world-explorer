export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const APP_ROUTES = {
  home: '/',
  quiz: '/quiz',
  countries: '/countries',
} as const;
