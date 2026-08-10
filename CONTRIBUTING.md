# Contributing

## Branching

Branch off `main`: `<type>/<short-description>` — e.g. `feat/room-list-pagination`, `fix/gateway-cors`.

## Commits

Conventional commits, lowercase, imperative: `<type>: <description>`.

Types used in this repo: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`.

Examples:

```
feat: add room deletion endpoint
fix: go services not loading .env
chore: add swagger docs to auth
```

## Code style

- TypeScript services: ESLint + Prettier. Path alias `@/*` resolves to each service's `src/`.
- Go services: `gofmt` + `go vet`. No `golangci-lint` (extra install friction, not worth it yet).
- Match structure depth to actual complexity — don't add `usecases/`/`ports/` layers until a service has real business rules. See README's Architecture section for current per-service reasoning.
- DTOs named after the handler they belong to: handler `GetHealth` ↔ DTO `GetHealthResponse` ↔ file `get-health-response.dto.ts` / `get_health.go`.
- New Go service handler needs `@Summary`/`@Router`/etc swaggo annotations — regenerated automatically by `air` on save (see `.air.toml`).
- New Express route needs `@openapi` JSDoc block — picked up automatically by `swagger-jsdoc` at runtime, no build step.

## Before pushing

```powershell
npm run format   # prettier --write + gofmt -w
npm run lint     # eslint + go vet
```

Git hooks (husky) enforce this automatically:

- **pre-commit** — `lint-staged`, auto-fixes/formats staged files only.
- **commit-msg** — `commitlint` against `@commitlint/config-conventional`. Rejects the commit if message doesn't follow `type: description`.
- **pre-push** — full `format:check` + `lint` + `tsc --noEmit` across every TS service + frontend. Push blocked if anything fails.

Don't bypass with `--no-verify` — fix what's failing instead.

## Pull requests

- Keep PRs scoped to one service/feature where possible.
- Title matches commit convention (`type: description`).
- CI equivalent is the pre-push hook — if it passes locally, PR should be green.

## Adding a new service

Follow the shallow pattern first (`config/`, `controllers or handlers/`, `dtos/`, `docs/`), matching `auth` (Node) or `code-runner` (Go). Add `usecases/`/`ports/`/`repositories/` only once real business rules exist — see `room` for the full pattern. Wire its `/docs.json` into `services/gateway/src/docs/router.ts` and add a `dev:<service>` script to the root `package.json`.
