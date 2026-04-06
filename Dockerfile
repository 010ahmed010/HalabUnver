FROM node:20-alpine AS frontend-builder
WORKDIR /build/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

COPY --from=frontend-builder /build/client/dist ./public

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["node", "server.js"]
