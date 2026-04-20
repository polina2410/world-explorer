# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Vitest in watch mode
npm run test:run     # Run Vitest once (CI)
npx vitest run src/__tests__/hooks/useQuiz.test.ts #run a single test file
```

## Code Style

- Always use TypeScript — no `any` types, use `unknown` or proper generics
- Prefer named exports over default exports
- Use `const` arrow functions for components
- Styles via CSS Modules (`.module.css`) — no inline styles, no global class strings
- No magic numbers — extract named constants

## Architecture

- Components live in `src/components/features/` or `src/components/UI/`
- Business logic in `src/lib/` or custom hooks in `src/hooks/`
- API calls only in `src/lib/` — never inline in components
- One component per file
- No prop drilling beyond 2 levels — use context or lift state

## Testing

- Tests live in `src/__tests__/` mirroring source structure
- Use Vitest + Testing Library
- Test custom hooks and utils — not component internals
- Always test happy path + at least one error case
- Run `npm run test:run` before marking any work complete

## Git

- Branch names: `kebab-case` derived from feature name
- Never force-push main
- Commit messages: imperative mood, under 72 chars
- Never commit `.env` or secrets
- Always confirm with the user before destructive git commands
- Never add `Co-Authored-By` lines to commit messages