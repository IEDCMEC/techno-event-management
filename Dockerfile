FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

COPY . .

RUN pnpm install

RUN pnpm run build --filter=techno-event-core... 

FROM gcr.io/distroless/nodejs20-debian11

COPY --from=builder /app/apps/core/dist .

ENV PORT=80

CMD ["app.js"]
