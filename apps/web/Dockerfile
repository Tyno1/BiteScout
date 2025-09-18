FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install


# Build the shared package first
WORKDIR /app/packages/shared
RUN npm run build

# Build the Next.js app
WORKDIR /app/apps/web
RUN npm run build

EXPOSE 3000

# Run web production command
CMD ["npm", "start"] 