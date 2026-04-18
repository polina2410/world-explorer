# Adapting claude-laravel Ideas to World Explorer

**Source:** https://github.com/AratKruglik/claude-laravel  
**Date:** 2026-04-18

## What the Source Repo Does

Turns Claude Code into a full AI development team for Laravel using:
- 18 specialized agents (each with strict tool scopes)
- 5 auto-loaded rules files (architecture, code-style, git, testing, workflow)
- 31 skill modules across all domains
- A pipeline orchestration pattern: Plan → Implement → Quality Gate (parallel) → Docs

The core ideas that transfer to any stack are: **conventions**, **specialized agents**, and **workflow pipelines**.

---

## What We Already Have

| What | Status |
|------|--------|
| `agents/code-scanner` | exists |
| `agents/refactor-scanner` | exists |
| `agents/ui-reviewer` | exists |
| `skills/feature` (full lifecycle) | exists |
| `skills/cleanup` | exists |
| `skills/research` | exists |
| Conventions in `CLAUDE.md` | **missing** |
| Debugger agent | **missing** |
| Developer agent | **missing** |
| Docs-writer agent | **missing** |
| Pipeline orchestration in feature workflow | **missing** |

---

## Step-by-Step Plan

### Step 1 — Add conventions to `CLAUDE.md` ✅ DONE

Project-level conventions belong in `CLAUDE.md` (auto-loaded every session). `.claude/rules/` is not an officially supported Claude Code feature — it was a convention invented by the source repo.

Added four sections to `CLAUDE.md`:
- **Code Style** — TypeScript, named exports, CSS Modules, no magic numbers
- **Architecture** — component structure, lib/hooks separation, no prop drilling
- **Testing** — Vitest standards, test location, happy path + error case requirement
- **Git** — branch naming, commit style, safety rules

---

### Step 2 — Add a `debugger` agent

Adapts the Laravel debugger's methodology to TypeScript/React. This agent does root-cause analysis only — it does not implement fixes.

**File:** `.claude/agents/debugger.md`

Key behaviors:
- Trigger words: "error", "broken", "debug", "exception", "failing", "not working", "crash", "undefined"
- Five-phase approach: Gather → Reproduce → Isolate → Fix → Verify
- Tools: Read, Grep, Glob, Bash (for running tests), mcp__playwright (for browser errors)
- Writes a failing test first to reproduce the bug before fixing
- Scope boundary: finding + fixing root cause only; delegates new features to the feature skill

---

### Step 3 — Add a `developer` agent

Currently all implementation happens inline. A dedicated developer agent with explicit constraints keeps quality consistent.

**File:** `.claude/agents/developer.md`

Key behaviors:
- Trigger words: "implement", "build", "add feature", "create component"
- Checks `context/features/current-feature.md` for active feature goals
- Enforces the rules from Step 1 automatically
- Tools: Read, Edit, Write, Glob, Grep, Bash, mcp__playwright (to verify UI)
- Quality checklist before reporting done: types pass, tests pass, lint passes, UI tested in browser
- Delegates: debugging → debugger agent, test writing → test action in feature skill

---

### Step 4 — Add a `docs-writer` agent

For generating/updating technical documentation only — never touches source code.

**File:** `.claude/agents/docs-writer.md`

Key behaviors:
- Trigger words: "document", "write docs", "update README", "explain this feature"
- Outputs to `context/` or project root markdown files
- Uses Read + Grep to understand existing code before writing
- Tools: Read, Glob, Grep, Write (docs only)
- Never modifies `.ts`, `.tsx`, `.js` files

---

### Step 5 — Upgrade the `feature/actions/start.md` pipeline

Adapt the source repo's orchestration pattern. After implementation, automatically run a quality gate.

**Update** `.claude/skills/feature/actions/start.md` to add after implementing goals:

```
After all goals are implemented:
6. Run quality gate in parallel:
   a. npm run lint — fix any lint errors
   b. npm run test:run — fix any failing tests
   c. Use ui-reviewer agent to check the UI
7. Only mark complete when all three pass
```

**Update** `.claude/skills/feature/actions/review.md` to mirror the six-dimension review framework from the source repo:
- Correctness, Security, Performance, Convention Compliance, Architecture, Maintainability

---

### Step 6 — Add `tools:` scopes to all agents (principle of least privilege)

The source repo gives each agent only the tools it needs. Update existing agents:

| Agent | Restrict to |
|-------|-------------|
| `code-scanner` | Read, Glob, Grep |
| `refactor-scanner` | Read, Glob, Grep |
| `ui-reviewer` | Read, Glob, Grep, mcp__playwright__* |
| `debugger` (new) | Read, Grep, Glob, Bash, mcp__playwright__* |
| `developer` (new) | Read, Edit, Write, Glob, Grep, Bash |
| `docs-writer` (new) | Read, Glob, Grep, Write |

---

## Priority Order

| Priority | Step | Effort | Value |
|----------|------|--------|-------|
| 1 | Step 1 — Conventions in CLAUDE.md | Low | Very High (auto-enforced every session) — **DONE** |
| 2 | Step 5 — Pipeline upgrade | Low | High (quality gate on every feature) |
| 3 | Step 2 — Debugger agent | Medium | High (saves context on bug hunts) |
| 4 | Step 6 — Tool scopes | Low | Medium (tidiness + security) |
| 5 | Step 3 — Developer agent | Medium | Medium (useful for complex features) |
| 6 | Step 4 — Docs-writer agent | Medium | Low-Medium (as needed) |

---

## What Was NOT Adapted (Laravel-specific)

- Docker workflow (`docker compose exec app` prefix everywhere)
- Laravel-specific agents: dba, queue-specialist, ci-cd-engineer, filament, ddd-architect
- PHP code style rules (strict_types, Eloquent, Form Requests)
- MCP Laravel Boost tools
- Bilingual Ukrainian trigger words
- TeamCreate/TeamDelete parallel agent orchestration (experimental feature)
