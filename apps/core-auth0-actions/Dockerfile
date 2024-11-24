FROM node:16-alpine AS builder
RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.15.1 --activate 

WORKDIR /app

RUN npm install turbo

COPY ../../. .

RUN apk add --no-cache \
    build-base \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg \
    python3
    
ENV PYTHON=/usr/bin/python3

RUN pnpm install

RUN pnpm run build --filter=core-auth0-actions... 

FROM node:18-alpine

COPY --from=builder /app/apps/core-auth0-actions/dist .
COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/node_modules/.prisma/client/*.node .

ENV PORT=80

CMD ["app.js"]
