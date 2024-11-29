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

RUN pnpm run build --filter=core-mailer... 

FROM node:18-alpine

COPY --from=builder /app/apps/core-mailer/dist .

ENV PORT=80

CMD ["app.js"]
