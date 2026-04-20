# Country Explorer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-world--explorer--phi.vercel.app-brightgreen?style=for-the-badge)](https://world-explorer-phi.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-12-purple)](https://motion.dev/)

![App Demo](./public/demo.gif)

An interactive web application for exploring countries and testing your knowledge of world capitals.
Built with Next.js, TypeScript, and Motion to deliver smooth animations and an engaging learning experience.

## Features

- **Home** - flag mosaic grid with continent filter and real-time search
- **Countries** - alphabetical list with A–Z filter, population sort, flag zoom, and map links
- **Globe** - interactive 3D globe with continent-colored country dots, click-to-detail cards, and a continent color legend
- **Quiz** - customizable capital-guessing quiz with progress tracking, scoring, and confetti
- **Feedback** - modal form saved to Supabase with rate limiting via Upstash Redis
- **Theming** - light/dark mode persisted across sessions
- **Accessibility** - semantic HTML, ARIA labels, keyboard navigation throughout

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Animation**: [Motion 12](https://motion.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Styling**: CSS Modules
- **Database**: [Supabase](https://supabase.com/)
- **Rate limiting**: [Upstash Redis](https://upstash.com/)
- **Confetti**: [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Fonts**: [Fontshare](https://www.fontshare.com/) - *Synonym (400), Amulya (700)*
- **3D Globe**: [react-globe.gl](https://github.com/vasturiano/globe.gl)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/polina2410/world-explorer.git
cd world-explorer
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your values:

```env
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

NEXT_PUBLIC_APP_URL=https://your-domain.com
```

Get Supabase values from your project under **Settings → API**.
Get Upstash values from your [Upstash Console](https://console.upstash.com/) after creating a Redis database - find them
under **REST API**.
Set `NEXT_PUBLIC_APP_URL` to your production domain for correct Open Graph URLs (defaults to `http://localhost:3000` in
development).

Then create the `feedback` table in your Supabase SQL editor:

```sql
create table feedback
(
    id         uuid primary key default gen_random_uuid(),
    name       text,
    email      text not null,
    message    text not null,
    created_at timestamptz      default now()
);
```

4. **Run the development server**

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Logging

Structured logging via `src/lib/logger.ts`:

- **Development**: colored console output
- **Production**: JSON per line, visible in Vercel's free function logs (Project → Logs)

Logged events: countries fetch, API route errors, feedback submissions, and rate limit blocks.

## Claude Code Setup

This project includes a Claude Code configuration under `.claude/` with custom agents, skills, and a feature workflow.

### Agents

Specialized sub-agents invoked automatically during the feature workflow or on demand:

| Agent | Purpose |
|-------|---------|
| `developer` | Full-stack React/Next.js implementation |
| `debugger` | Root-cause analysis for TypeScript/React bugs |
| `qa` | E2E testing with Playwright |
| `ui-reviewer` | Visual, responsive, and accessibility review via Playwright |
| `a11y` | WCAG AA accessibility audit |
| `performance` | Bundle size, Core Web Vitals, and caching audit |
| `code-scanner` | Code quality, security, and performance issues |
| `refactor-scanner` | Duplicated logic and DRY violations |
| `react-refactoring-expert` | Complexity reduction and refactoring |
| `coverage` | Test coverage gaps by risk |
| `api` | Next.js API route design and validation audit |
| `supabase` | Schema, RLS policies, and migration review |
| `devops` | CI/CD workflows and secret hygiene |
| `dependency-manager` | npm hygiene, vulnerabilities, upgrade planning |
| `ba` | Requirements engineering and user story writing |
| `devil` | Devil's advocate critic for plans and architecture |
| `docs-writer` | README, architecture guides, and context files |

### Skills (slash commands)

Invokable via `/skill-name` in the Claude Code CLI:

| Skill | Purpose |
|-------|---------|
| `/feature` | Full feature lifecycle: load spec → start → review → complete |
| `/research` | Generate documentation from code and external sources |
| `/brainstorming` | Structured ideation before implementation |
| `/plan-writing` | Task decomposition and implementation plans |
| `/code-reviewer` | Deep review for correctness, patterns, security |
| `/test-master` | Write Vitest unit and integration tests |
| `/playwright-expert` | E2E test authoring with Playwright MCP |
| `/api-design` | API route structure, validation, and error handling |
| `/github-actions` | CI/CD workflow setup and debugging |
| `/cleanup` | Remove console logs, unused imports, verify .gitignore |

### Feature Workflow

The `/feature` skill manages the full lifecycle of a feature:

1. `/feature load <description>` — define goals and acceptance criteria
2. `/feature start` — create branch, begin implementation with quality gates
3. `/feature review` — verify goals met, run code-scanner and accessibility audit
4. `/feature complete` — commit, push, open PR, reset working file

## Open Graph Image

To enable rich link previews on social media, add an `og-image-default.png` (1200×630px) to the `/public` directory.

![OG tag example](./public/og-tag-example.jpg)

---

## License

MIT

---

## Acknowledgments

- Country data provided by [REST Countries API](https://restcountries.com/)
- Tab icon and OG image generated with ChatGPT
- Built with Next.js and deployed on Vercel

---

## Contact

Polina - [polinasmekhova@gmail.com](mailto:polinasmekhova@gmail.com)
