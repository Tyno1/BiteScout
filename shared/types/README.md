# Shared Types Structure

This directory contains all shared TypeScript types generated from the OpenAPI specification and organized by endpoint/concern.

## Structure

```
types/
├── generated.ts              # Auto-generated types from OpenAPI spec
├── api/
│   ├── paths.ts             # Request/response types by endpoint
│   └── schemas.ts           # Schema types
├── auth/                    # Authentication types
│   ├── register.ts          # Register request, response, errors
│   ├── login.ts             # Login request, response, errors
│   ├── refresh.ts           # Refresh token request, response, errors
│   └── index.ts
├── user/                    # User management types
│   ├── update.ts            # User update request, response, errors
│   └── index.ts
├── restaurant/              # Restaurant management types
│   ├── create.ts            # Restaurant creation
│   ├── get.ts               # Restaurant retrieval
│   ├── search.ts            # Restaurant search
│   ├── update.ts            # Restaurant updates
│   ├── delete.ts            # Restaurant deletion
│   ├── food-catalogue/      # Food catalogue types
│   │   ├── create.ts        # Food item creation
│   │   ├── get.ts           # Food item retrieval
│   │   ├── update.ts        # Food item updates
│   │   ├── delete.ts        # Food item deletion
│   │   └── index.ts
│   └── index.ts
├── access/                  # Restaurant access types
│   ├── request.ts           # Access requests
│   ├── get.ts               # Access retrieval
│   ├── manage.ts            # Access management (grant, suspend, delete, update)
│   └── index.ts
├── notifications/           # Notification types
│   ├── get.ts               # Notification retrieval
│   ├── mark-read.ts         # Mark notifications as read
│   └── index.ts
├── common/                  # Common utility types
├── index.ts                 # Main export file
└── README.md               # This file
```

## Usage

Each concern (like `register`, `login`, etc.) groups all related types together:

```typescript
// Import all auth types
import { RegisterRequest, RegisterResponse, RegisterError400 } from '@shared/types/auth';

// Import specific restaurant types
import { CreateRestaurantRequest, CreateRestaurantResponse } from '@shared/types/restaurant';

// Import food catalogue types
import { CreateFoodCatalogueRequest, CreateFoodCatalogueResponse } from '@shared/types/restaurant/food-catalogue';
```

## Organization Principle

- **Group by endpoint/concern**: All related request, response, and error types are in the same file
- **Clear naming**: Files are named after the main action (e.g., `register.ts`, `create.ts`)
- **Hierarchical structure**: Related concerns are nested (e.g., `restaurant/food-catalogue/`)
- **Consistent exports**: Each folder has an `index.ts` that exports all types

## Benefits

1. **Easy to find**: Related types are grouped together
2. **Clear imports**: Import exactly what you need
3. **Maintainable**: Changes to an endpoint only affect one file
4. **Type-safe**: All types are generated from OpenAPI spec
5. **Consistent**: Same structure across all categories 