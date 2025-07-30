# BiteScout - Turborepo

A monorepo for the BiteScout application using Turborepo.

## Project Structure

```
BiteScout/
├── apps/
│   ├── web/              # Next.js web application
│   ├── mobile/           # React Native/Expo mobile app
│   ├── backend/          # Node.js/Express API server
│   └── media-service/    # NestJS media management microservice
├── packages/
│   └── shared/           # Shared types and utilities
├── package.json          # Root workspace configuration
└── turbo.json            # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher (required for Next.js)
- Yarn 1.22.21 or higher

### Installation

```bash
# Install all dependencies
yarn install
```

### Development

```bash
# Start all applications in development mode
yarn dev

# Start specific applications
yarn turbo dev --filter=web
yarn turbo dev --filter=backend
yarn turbo dev --filter=mobile
yarn turbo dev --filter=media-service
```

### Building

```bash
# Build all applications
yarn build

# Build specific applications
yarn turbo build --filter=web
yarn turbo build --filter=backend
yarn turbo build --filter=media-service
```

### Type Generation

```bash
# Generate types from OpenAPI specs
yarn generate-types
```

### Testing

```bash
# Run tests for all packages
yarn test

# Run tests for specific packages
yarn turbo test --filter=web
yarn turbo test --filter=media-service
```

### Linting

```bash
# Lint all packages
yarn lint

# Lint specific packages
yarn turbo lint --filter=web
yarn turbo lint --filter=media-service
```

## Available Scripts

### Main Application
- `yarn dev` - Start all applications in development mode
- `yarn build` - Build all applications
- `yarn test` - Run tests for all packages
- `yarn lint` - Lint all packages
- `yarn clean` - Clean build artifacts
- `yarn generate-types` - Generate TypeScript types from OpenAPI specs

### Docker Commands
- `yarn docker:dev` - Start main app with Docker
- `yarn docker:dev:build` - Build and start main app with Docker
- `yarn docker:prod` - Start main app in production mode
- `yarn docker:down` - Stop all Docker containers
- `yarn docker:logs` - View Docker logs

### Media Service (Standalone)
- `yarn media:dev` - Start media service with Docker
- `yarn media:dev:build` - Build and start media service
- `yarn media:down` - Stop media service
- `yarn media:logs` - View media service logs

> **Note**: The Media Service is a standalone microservice. See [docs/MEDIA_SERVICE.md](./docs/MEDIA_SERVICE.md) for detailed documentation.

## 📚 Documentation

For comprehensive documentation about the architecture and implementation, see the [docs/](./docs/) folder:

- **[docs/README.md](./docs/README.md)** - Documentation index and overview
- **[docs/HYBRID_MEDIA_ARCHITECTURE.md](./docs/HYBRID_MEDIA_ARCHITECTURE.md)** - Complete architecture documentation
- **[docs/MEDIA_SERVICE.md](./docs/MEDIA_SERVICE.md)** - Standalone media service guide

## Package Dependencies

- **web** depends on **shared** for types
- **backend** depends on **shared** for types
- **mobile** is independent
- **media-service** is independent (NestJS microservice)
- **shared** is the foundation package with common types

## Services Overview

### Web Application (`apps/web`)
- **Framework**: Next.js 15 with App Router
- **Port**: 3001 (development)
- **Features**: Restaurant management dashboard, user authentication, food catalog management

### Backend API (`apps/backend`)
- **Framework**: Express.js with TypeScript
- **Port**: 5002 (development)
- **Features**: RESTful API, authentication, restaurant management, user management

### Media Service (`apps/media-service`)
- **Framework**: NestJS with TypeScript
- **Port**: 3002 (development)
- **Features**: Image and video upload, processing, optimization, multi-provider support (Cloudinary/AWS S3)
- **API Documentation**: Available at `http://localhost:3002/api`

### Mobile Application (`apps/mobile`)
- **Framework**: React Native with Expo
- **Features**: Cross-platform mobile app for restaurant management

## Turborepo Features

- **Caching**: Build outputs are cached for faster subsequent builds
- **Parallel Execution**: Tasks run in parallel when possible
- **Dependency Management**: Automatic task dependency resolution
- **Incremental Builds**: Only rebuild what's changed

## Development Workflow

1. **Start Development**: `yarn dev` to start all services
2. **Make Changes**: Edit code in any package
3. **Type Generation**: `yarn generate-types` when API changes
4. **Build**: `yarn build` to build all packages
5. **Test**: `yarn test` to run all tests

## Troubleshooting

### Node.js Version Issues
If you encounter Node.js version warnings, upgrade to Node.js 18.18.0 or higher:
```bash
nvm install 18.18.0
nvm use 18.18.0
```

### Cache Issues
Clear Turborepo cache if you encounter build issues:
```bash
npx turbo clean
```
