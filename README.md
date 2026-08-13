# CoPy

Collaborative code editor — real-time room-based coding with in-browser execution.

## Architecture

Microservices behind single gateway. Node/TypeScript for business-logic services, Go for I/O-heavy services (real-time collab, sandboxed code execution).

| Service     | Language   | Port | Responsibility                              |
| ----------- | ---------- | ---- | ------------------------------------------- |
| gateway     | TS/Express | 8000 | Entry point, reverse proxy, aggregated docs |
| auth        | TS/Express | 8001 | Google OAuth, JWT issuance                  |
| room        | TS/Express | 8002 | Room CRUD                                   |
| collab      | Go         | 8004 | Real-time collaboration (gRPC :8003, WS)    |
| code-runner | Go         | 8005 | Sandboxed code execution (Docker)           |
| frontend    | React/Vite | 5173 | UI                                          |

All traffic goes through **gateway** (`/auth`, `/rooms`, `/collab`, `/run`). Services not meant to be called directly except local debugging.

Structure depth matches each service's real complexity:

- **room** — full Clean Architecture: `entities/` → `usecases/` → `ports/` (interfaces) → `repositories/` (implementations), plus `controllers/`, `routes/`, `dtos/`. Business rules (e.g. only owner can delete a room) live in `usecases/`, never controllers.
- **auth**, **gateway** — flat (`config/`, `controllers/`, `dtos/`, `docs/`). No `usecases/`/`ports/` yet — no real business logic beyond health check and routing.
- **code-runner**, **collab** (Go) — `cmd/main.go` (wiring only), `internal/config`, `internal/handlers`, `internal/dtos`. Same reasoning: usecases layer added once real feature (Docker sandbox, gRPC sync) lands.

## Setup

Prerequisites:

- [Node.js](https://nodejs.org/) 20+
- [Go](https://go.dev/) 1.22+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — required for `code-runner`'s sandbox

`swag`/`air` (used for API doc generation and Go hot-reload) do **not** need manual install — `npm install` installs them automatically if missing (see below). You do need `$(go env GOPATH)/bin` on your `PATH` for your shell to find them afterward.

```powershell
git clone <repo-url>
cd copy
Copy-Item .env.example .env
npm install
```

`npm install` uses npm workspaces — installs `frontend` + all Node services in one pass. A `postinstall` hook ([scripts/postinstall.ts](scripts/postinstall.ts)) runs `go mod download` for both Go services, then `go install`s `swag`/`air` if they're not already on `PATH`. If `$(go env GOPATH)/bin` itself isn't on `PATH`, the hook prints a warning with the fix — it can't add it for you since a fresh terminal is needed for a `PATH` change to take effect.

`.env` shape: shared `BASE_SERVICE_URL` (default `http://localhost`) + per-service `<NAME>_PORT`. Gateway builds each proxy target itself as `${BASE_SERVICE_URL}:${PORT}`.

### Run

```powershell
npm run dev:frontend      # :5173
npm run dev:gateway       # :8000
npm run dev:auth          # :8001
npm run dev:room          # :8002
npm run dev:collab        # :8004
npm run dev:code-runner   # :8005
```

Run whichever service you're working on — no single command starts all (kept simple, no `concurrently` dependency). Health check any service at `http://<host>/health`.

### Run with Docker

Prefer not to install Node/Go/`swag`/`air` locally? The 5 backend services (`gateway`, `auth`, `room`, `collab`, `code-runner`) run in containers with hot reload — edit a file on your host and the service inside the container restarts, same as native dev:

```powershell
Copy-Item .env.example .env
docker compose up
```

Frontend is not containerized — keep running it natively (`npm run dev:frontend`) for the fastest Vite HMR. Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) only, no local Node/Go toolchain. These are dev-only images (no prod build stage yet).

### API docs

Every service exposes its own `/docs.json`. Gateway aggregates all into one Swagger UI:

```
http://localhost:8000/docs
```

Dropdown at top switches between services.

See [CONTRIBUTION.md](CONTRIBUTION.md) for workflow, commit convention, and tooling.
