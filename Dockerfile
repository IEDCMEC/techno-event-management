FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

COPY . .
RUN turbo prune --scope=techno-event-core --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm turbo

RUN pnpm install

COPY --from=builder /app/out/full/ .

ENV PORT=80

RUN pnpm turbo run build --filter=techno-event-core...

WORKDIR /app/apps/core

CMD ["pnpm", "start"]
