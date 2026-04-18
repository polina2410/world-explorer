# Start Action

1. Read current-feature.md - verify Goals are populated
2. If empty, error: "Run /feature load first"
3. Set Status to "In Progress"
4. Create and checkout the feature branch (derive name from H1 heading)
5. List the goals, then implement them one by one

## Quality Gate (run after all goals implemented)

6. Run `npm run lint` — fix any errors before continuing
7. Run `npm run test:run` — fix any failing tests before continuing
8. Use the `ui-reviewer` agent to check the UI visually
9. Only report the feature as done when all three pass