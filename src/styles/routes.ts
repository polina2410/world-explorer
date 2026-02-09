export const ROUTES = {
  home: '/',
  game: '/game',
  countries: '/countries',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
