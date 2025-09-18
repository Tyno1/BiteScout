FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies from root (resolves workspace dependencies)
RUN npm install --ignore-engines --network-timeout=100000 --retry=3

# Copy source code
COPY . .

# Build all packages using Turbo and ensure workspace linking
RUN npm run turbo run build --filter=shared --filter=backend && \
    npm install --ignore-engines --network-timeout=100000 --retry=3

# Backend-specific environment variables
ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

# Run backend production command
WORKDIR /app/apps/backend
CMD ["npm", "start"] 