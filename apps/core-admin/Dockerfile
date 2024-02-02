FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

COPY ../../. .

RUN pnpm install

RUN pnpm run build --filter=techno-event-core-admin... 

FROM node:18-alpine

COPY --from=builder /app/apps/core-admin/dist .
COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/node_modules/.prisma/client/*.node .

ENV PORT=80

CMD ["app.js"]
