---
name: github-actions
description: >
  GitHub Actions CI/CD specialist for Next.js. Use when setting up or modifying CI pipelines,
  adding workflow files, or debugging failing GitHub Actions runs. Trigger words: CI, github
  actions, workflow, pipeline, set up CI, failing action, add linting to CI.
argument-hint: create|review|debug
---

# GitHub Actions

$ARGUMENTS a GitHub Actions workflow for this Next.js project.

| Action | Description |
|--------|-------------|
| `create` | Scaffold a new workflow file |
| `review` | Audit an existing workflow for issues |
| `debug` | Diagnose a failing workflow run |

---

## Standard CI Pipeline for This Project

Every PR and push to `main` should run:

```
Install (cached) → Lint → Test → Build
```

### Workflow File: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test:run

      - name: Build
        run: npm run build
        env:
          # Add any public env vars the build needs
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
```

---

## Core Principles

### Fail Fast
Order steps from cheapest to most expensive:
1. Install (cached — fast)
2. Lint (seconds)
3. Test (seconds–minutes)
4. Build (slowest — run last)

If lint fails, don't waste time running tests or build.

### Cache Dependencies
Always cache `node_modules` via `actions/setup-node` with `cache: 'npm'`. This saves 30–60s per run.

### Pin Action Versions
Use `@v4` tags — not `@latest`. Unpinned actions can break without warning.

### Secrets
- Store sensitive values in **GitHub repo Settings → Secrets and variables → Actions**
- Never hardcode secrets in workflow files
- Use `${{ secrets.SECRET_NAME }}` syntax
- `NEXT_PUBLIC_*` vars needed at build time must be passed as `env:` in the build step

### Minimum Permissions
The default `GITHUB_TOKEN` is fine for most CI. Only request elevated permissions if needed (e.g. for release publishing).

---

## Common Patterns

### Run only when relevant files change
```yaml
on:
  push:
    paths:
      - 'src/**'
      - 'package*.json'
      - '.github/workflows/**'
```

### Cancel redundant runs (same PR, new push)
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Upload test results on failure
```yaml
- name: Upload test results
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: test-results/
```

---

## Checklist for New Workflows

- [ ] Triggers defined (`push`, `pull_request`, or both)
- [ ] Node version pinned (match `.nvmrc` or `package.json` engines if set)
- [ ] `npm ci` used (not `npm install`) — reproducible installs
- [ ] Dependency cache configured
- [ ] Steps ordered: lint → test → build
- [ ] Secrets referenced via `${{ secrets.* }}`, not hardcoded
- [ ] `concurrency` set to cancel stale runs
- [ ] Action versions pinned (`@v4` not `@latest`)
