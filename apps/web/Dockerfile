FROM node:20-alpine

# Enable Corepack to support Yarn
RUN corepack enable

WORKDIR /app

COPY package*.json turbo.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/shared/package*.json ./packages/shared/

RUN yarn install

COPY . .

# Build the Next.js app
WORKDIR /app/apps/web
RUN yarn build

ENV NEXT_PUBLIC_API_URL=http://backend:5001
ENV NEXT_PUBLIC_AUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_SOCKET_URL=http://backend:5001

EXPOSE 3000

# Run web dev command
CMD ["yarn", "dev"] 