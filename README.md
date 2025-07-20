# BiteScout - Turborepo

A monorepo for the BiteScout application using Turborepo.

## Project Structure

```
BiteScout/
├── apps/
│   ├── web/          # Next.js web application
│   ├── mobile/       # React Native/Expo mobile app
│   └── backend/      # Node.js/Express API server
├── packages/
│   └── shared/       # Shared types and utilities
├── package.json      # Root workspace configuration
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher (required for Next.js)
- npm 9.0.0 or higher

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Start all applications in development mode
npm run dev

# Start specific applications
npx turbo dev --filter=web
npx turbo dev --filter=backend
npx turbo dev --filter=mobile
```

### Building

```bash
# Build all applications
npm run build

# Build specific applications
npx turbo build --filter=web
npx turbo build --filter=backend
```

### Type Generation

```bash
# Generate types from OpenAPI specs
npm run generate-types
```

### Testing

```bash
# Run tests for all packages
npm run test

# Run tests for specific packages
npx turbo test --filter=web
```

### Linting

```bash
# Lint all packages
npm run lint

# Lint specific packages
npx turbo lint --filter=web
```

## Available Scripts

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications
- `npm run test` - Run tests for all packages
- `npm run lint` - Lint all packages
- `npm run clean` - Clean build artifacts
- `npm run generate-types` - Generate TypeScript types from OpenAPI specs

## Package Dependencies

- **web** depends on **shared** for types
- **backend** depends on **shared** for types
- **mobile** is independent
- **shared** is the foundation package with common types

## Turborepo Features

- **Caching**: Build outputs are cached for faster subsequent builds
- **Parallel Execution**: Tasks run in parallel when possible
- **Dependency Management**: Automatic task dependency resolution
- **Incremental Builds**: Only rebuild what's changed

## Development Workflow

1. **Start Development**: `npm run dev` to start all services
2. **Make Changes**: Edit code in any package
3. **Type Generation**: `npm run generate-types` when API changes
4. **Build**: `npm run build` to build all packages
5. **Test**: `npm run test` to run all tests

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
