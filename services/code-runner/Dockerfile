FROM golang:1.26-alpine AS base
RUN adduser -D -u 1000 app
WORKDIR /app

FROM base AS deps
COPY go.mod go.sum ./
RUN go mod download

FROM deps AS dev
RUN go install github.com/air-verse/air@latest && \
    go install github.com/swaggo/swag/cmd/swag@latest
COPY . .
RUN chown -R app:app /app /go
USER app
EXPOSE 8005
CMD ["air", "-c", ".air.docker.toml"]
