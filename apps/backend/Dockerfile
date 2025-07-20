FROM node:20-alpine

# Enable Corepack to support Yarn
RUN corepack enable

WORKDIR /app

COPY package*.json turbo.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY apps/backend/package*.json ./apps/backend/

RUN yarn install

COPY . .

# Build the shared package first
WORKDIR /app/packages/shared
RUN yarn build

# Build the TypeScript backend
WORKDIR /app/apps/backend
RUN yarn build

# Copy shared types to backend for runtime access
RUN mkdir -p dist/shared/types
RUN cp -r ../../packages/shared/types/* dist/shared/types/

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