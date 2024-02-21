FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

COPY ../../. .

RUN pnpm install

RUN pnpm run build --filter=core-mailer... 

FROM node:18-alpine

COPY --from=builder /app/apps/core-mailer/dist .

ENV PORT=80

CMD ["app.js"]
