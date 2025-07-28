FROM node:20-alpine

# Enable Corepack to support Yarn
RUN corepack enable

WORKDIR /app

COPY . .

RUN yarn install


# Build the shared package first
WORKDIR /app/packages/shared
RUN yarn build

# Build the Next.js app
WORKDIR /app/apps/web
RUN yarn build

EXPOSE 3000

# Run web production command
CMD ["yarn", "start"] 