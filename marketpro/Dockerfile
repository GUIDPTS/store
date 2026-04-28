# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx nuxt prepare
RUN npx nuxt build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output /app/.output
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
