# Restaurant Data Migration to React Query

This directory contains the React Query implementation for restaurant data management, replacing the Zustand store approach.

## Structure

```
hooks/restaurant/
├── index.ts                    # Main exports
├── useRestaurant.ts            # Get restaurant by ID
├── useRestaurantByOwner.ts     # Get restaurant by owner ID
├── useRestaurantsByName.ts     # Search restaurants by name
├── useDeliveryLinks.ts         # Get delivery links for restaurant
└── mutations/
    ├── index.ts                # Mutation exports
    ├── useCreateRestaurant.ts  # Create restaurant mutation
    ├── useUpdateRestaurant.ts  # Update restaurant mutation
    └── useDeliveryLinkMutations.ts # Delivery link mutations
```

## API Functions

The API functions are located in `src/api/restaurant/`:

```
api/restaurant/
├── index.ts        # Main exports
├── queries.ts      # Query functions (GET requests)
└── mutations.ts    # Mutation functions (POST, PUT, DELETE)
```

## Usage Examples

### Before (Zustand)
```typescript
const { restaurantData, isLoading } = useRestaurant();

useEffect(() => {
  getRestaurantById(id);
}, [id]);
```

### After (React Query)
```typescript
const { data: restaurant, isLoading, error } = useRestaurant(id);
```

### Mutations

#### Before (Zustand)
```typescript
const createRestaurantMutation = useCreateRestaurant();

const handleSubmit = async (data) => {
  	createRestaurantMutation.mutate(data);
};
```

#### After (React Query)
```typescript
const createRestaurantMutation = useCreateRestaurant();

const handleSubmit = (data) => {
  createRestaurantMutation.mutate(data);
};
```

## Benefits

1. **Automatic Caching**: React Query automatically caches data and provides stale-while-revalidate behavior
2. **Background Updates**: Data is automatically refetched in the background
3. **Optimistic Updates**: Built-in support for optimistic UI updates
4. **Error Handling**: Automatic error handling and retries
5. **Loading States**: Built-in loading and error states
6. **Dev Tools**: React Query DevTools for debugging
7. **Type Safety**: Full TypeScript support
8. **Performance**: Automatic request deduplication and caching

## Migration Steps

1. **Install Dependencies**: React Query is already installed
2. **Setup Provider**: QueryProvider is already configured in `src/providers/Provider.tsx`
3. **Replace Store Usage**: Replace Zustand store calls with React Query hooks
4. **Update Components**: Update components to use the new hooks
5. **Remove Store**: Once migration is complete, remove the Zustand store

## Available Hooks

### Query Hooks
- `useRestaurant(id)` - Get restaurant by ID
- `useRestaurantByOwner(ownerId)` - Get restaurant by owner ID
- `useRestaurantsByName(name)` - Search restaurants by name
- `useDeliveryLinks(restaurantId)` - Get delivery links for restaurant

### Mutation Hooks
- `useCreateRestaurant()` - Create a new restaurant
- `useUpdateRestaurant()` - Update an existing restaurant
- `useAddDeliveryLink()` - Add a delivery link
- `useUpdateDeliveryLink()` - Update a delivery link
- `useDeleteDeliveryLink()` - Delete a delivery link

## Configuration

The React Query client is configured with:
- **Stale Time**: 5 minutes (data considered fresh for 5 minutes)
- **GC Time**: 10 minutes (cached data kept for 10 minutes)
- **Retries**: 1 retry on failure
- **Refetch on Window Focus**: Disabled

## Dev Tools

React Query DevTools are available in development mode. They can be opened by clicking the React Query icon in the browser's developer tools. 