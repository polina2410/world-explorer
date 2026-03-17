# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Vitest in watch mode
npm run test:run     # Run Vitest once (CI)
```

Run a single test file:
```bash
npx vitest run src/__tests__/hooks/useQuiz.test.ts
```

## Architecture

**world-explorer** is a Next.js App Router application for exploring countries and quizzing world geography knowledge. Data flows from the REST Countries API → Zod validation → React Context → components.

### Data Flow

- `src/app/api/countries/route.ts` — single API route that fetches from `restcountries.com/v3.1/all`, validates with Zod (`src/schemas/country.ts`), filters to independent countries, and returns a simplified shape
- `src/context/CountriesContext.tsx` — fetches `/api/countries` on mount and provides `{ countries, loading, error }` to the tree
- Types are inferred from Zod schemas; `CountryResponse` in `src/types/country.ts` is the canonical shape used throughout the UI

### Context Providers (nested in `src/app/layout.tsx`)

| Provider | Purpose |
|---|---|
| `ThemeProvider` | Light/dark mode, persisted in localStorage |
| `NavigationGuardProvider` | Blocks navigation while quiz is active (ref-based, no re-renders) |
| `GameProvider` | Quiz phase (`start` → `setup` → `quiz`), continent, question count |
| `CountriesProvider` | Country data, loading/error state |

Each provider exports a custom hook (e.g. `useCountries()`, `useGame()`).

### Component Organization

```
src/components/
  features/    # Business-logic components (Game, CountriesTable, FlagMosaic, …)
  layout/      # Header, NavLink
  UI/          # Reusable primitives (Button, Modal, Dropdown, Tooltip, …)
  icons/
```

### Animations

All Framer Motion presets live in `src/animations/index.ts` — page variants, card stagger configs, spring transitions, etc. Import from there rather than defining inline.

### Constants & Routes

- `src/constants/routes.ts` — `APP_ROUTES` and `API_ROUTES`
- `src/constants/index.ts` — UI messages, timing constants (answer reveal: 1000ms, auto-close: 2500ms), scoring thresholds (≥50 confetti, ≥70 "good", 100 perfect)

### Testing

Tests live under `src/__tests__/` mirroring the `src/` structure (`api/`, `components/`, `context/`, `hooks/`, `schemas/`, `utils/`). Setup file: `src/__tests__/setup.ts` (imports `@testing-library/jest-dom`). Config: `vitest.config.ts`.

### Path Alias

`@/` maps to `src/` in both TypeScript and Vitest configs.
