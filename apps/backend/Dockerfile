FROM node:20-alpine

# Enable Corepack to support Yarn
RUN corepack enable

WORKDIR /app

COPY . .

# Build the shared package first (before installing dependencies)
WORKDIR /app
RUN yarn install --network-timeout 100000 --retry 3 || yarn install --network-timeout 100000 --retry 3
WORKDIR /app/packages/shared
RUN yarn build

# Debug: Show what was built in shared package
RUN echo "=== Shared Package Build Output ==="
RUN ls -la
RUN echo "=== Shared Package Dist Directory ==="
RUN ls -la dist/ || echo "No dist directory"
RUN echo "=== Shared Package Types Directory ==="
RUN ls -la types/ || echo "No types directory"

# Now install all dependencies (including workspace dependencies)
WORKDIR /app
RUN yarn cache clean
RUN yarn install --network-timeout 100000 --retry 3 || yarn install --network-timeout 100000 --retry 3

# Build the TypeScript backend
WORKDIR /app/apps/backend
RUN yarn build

# Install dependencies again to ensure shared package is linked
RUN yarn install --network-timeout 100000 --retry 3 || yarn install --network-timeout 100000 --retry 3

# Yarn workspaces will handle the shared package linking automatically
RUN echo "=== Backend node_modules/shared (workspace) ==="
RUN ls -la node_modules/shared/ || echo "No shared directory"

# Debug: Show what was built
RUN echo "=== Build Output ==="
RUN ls -la
RUN echo "=== Dist Directory ==="
RUN ls -la dist/
RUN echo "=== Shared Types Directory ==="
RUN ls -la dist/shared/types/ || echo "No shared types directory"

# Backend-specific environment variables
ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

# Run backend production command
CMD ["yarn", "start"] 