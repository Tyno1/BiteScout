FROM node:20-alpine

# Enable Corepack to support Yarn
RUN corepack enable

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies from root (resolves workspace dependencies)
RUN yarn install --frozen-lockfile --network-timeout 100000 --retry 3

# Copy source code
COPY . .

# Build all packages using Turbo (handles build order automatically)
RUN yarn turbo run build --filter=shared --filter=backend

# Debug: Show what was built
RUN echo "=== Shared Package Build Output ==="
RUN ls -la packages/shared/dist/ || echo "No shared dist"
RUN echo "=== Backend Build Output ==="
RUN ls -la apps/backend/dist/ || echo "No backend dist"
RUN echo "=== Backend node_modules/shared ==="
RUN ls -la apps/backend/node_modules/shared/ || echo "No shared in node_modules"

# Backend-specific environment variables
ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

# Run backend production command
CMD ["yarn", "workspace", "backend", "start"] 