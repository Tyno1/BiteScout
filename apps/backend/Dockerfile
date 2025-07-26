FROM node:20-alpine

# Enable Corepack to support Yarn
RUN corepack enable

WORKDIR /app

COPY . .

RUN yarn install


# Build the shared package first
WORKDIR /app/packages/shared
RUN yarn build

# Build the TypeScript backend
WORKDIR /app/apps/backend
RUN yarn build

# Install dependencies again to ensure shared package is linked
RUN yarn install

# Copy shared dist to backend for runtime access
RUN mkdir -p dist/shared
RUN cp -r ../../packages/shared/dist/* dist/shared/

# Debug: Show what was built
RUN echo "=== Shared Package Dist ==="
RUN ls -la ../../packages/shared/dist/
RUN echo "=== Backend Dist ==="
RUN ls -la dist/
RUN echo "=== Shared in Backend Dist ==="
RUN ls -la dist/shared/ || echo "No shared directory"

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