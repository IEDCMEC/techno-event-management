FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g pnpm turbo

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

RUN pnpm run build --filter=registration-admin... 

# FROM node:18-alpine

# COPY --from=builder /app/apps/core-auth0-actions/dist .
# COPY --from=builder /app/node_modules/.pnpm/@prisma+client*/node_modules/.prisma/client/*.node .

# COPY --from=builder ../apps/registration-admin/dist /app/register-build/
# RUN pnpm install typescript

# Use a lightweight web server to serve the static files
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--filter=registration-admin"]