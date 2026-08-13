FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY services/gateway/package.json services/gateway/package.json
COPY services/auth/package.json services/auth/package.json
COPY services/room/package.json services/room/package.json
RUN npm ci --ignore-scripts

FROM deps AS dev
COPY --chown=node:node services/auth services/auth
WORKDIR /app/services/auth
USER node
EXPOSE 8001
CMD ["npm", "run", "dev"]
