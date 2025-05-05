# Builder stage - builds SPA from source
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm install 

COPY src src
COPY public public
COPY nginx/env.docker .env.production.local
RUN npm run build

# Final stage
FROM nginx:1
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/server.conf.template /etc/nginx/templates/server.conf.template
# .envsh so that exiting the script kills the container
COPY nginx/api-filler.sh /docker-entrypoint.d/99-api-filler.envsh

