# BiteScout Shared Package

This package contains shared TypeScript types and OpenAPI specifications that are used across the web, mobile, and backend applications.

## Structure

```
shared/
├── openapi/          # OpenAPI specifications
│   └── spec.yaml    # Main API specification
├── types/           # TypeScript type definitions
│   ├── generated.ts # Auto-generated from OpenAPI spec
│   ├── api/         # API type organization
│   │   ├── paths.ts # Request/Response types by endpoint
│   │   └── schemas.ts # Schema types
│   ├── auth/        # Authentication types
│   ├── user/        # User types
│   ├── restaurant/  # Restaurant types
│   ├── access/      # Restaurant access types
│   ├── notifications/ # Notification types
│   ├── common.ts    # Common utility types
│   └── index.ts     # Main export file
├── clients/         # Generated API clients
└── scripts/         # Build and generation scripts
```

## Usage

### In Backend
```typescript
import type { User, Restaurant, LoginRequest, LoginResponse } from '@bitescout/shared';
```

### In Web App
```typescript
import type { User, Restaurant, LoginRequest, LoginResponse } from '@bitescout/shared';
```

### In Mobile App
```typescript
import type { User, Restaurant, LoginRequest, LoginResponse } from '@bitescout/shared';
```

## Development

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Generate types from OpenAPI spec:**
   ```bash
   yarn generate-types
   ```

3. **Build the package:**
   ```bash
   yarn build
   ```

4. **Watch for changes:**
   ```bash
   yarn watch
   ```

## Adding New Types

1. Create a new file in `types/` (e.g., `types/notification.ts`)
2. Export your types
3. Add the export to `types/index.ts`
4. Build the package

## OpenAPI Integration

The OpenAPI specification in `openapi/spec.yaml` is used to:
- Generate TypeScript types automatically
- Generate API clients for different platforms
- Ensure type safety across all applications

Run `yarn generate-types` after updating the OpenAPI spec to regenerate the types. 