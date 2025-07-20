# Notification System Migration

## Overview
The notification system has been updated to align with the API specification. This includes changes to the database schema, API responses, and frontend store.

## Changes Made

### 1. Database Schema Updates (Notification.js)
- **Field name changes:**
  - `read` → `isRead`
  - `data` → `metadata`
- **New required fields:**
  - `message` (required)
  - `title` (optional)
- **Updated enum values:**
  - `access-request` → `access_request`
  - Added: `access_granted`, `access_denied`, `access_suspended`, `restaurant_update`

### 2. Service Layer Updates (notificationService.js)
- Removed data transformation - now returns MongoDB documents directly
- All responses use `_id` (MongoDB's default) to match API spec
- Updated all methods to use new field names (`isRead` instead of `read`)

### 3. Controller Updates (notificationController.ts)
- Fixed response format for `markAllAsRead` to include `updatedCount`
- Added proper return statements for error cases

### 4. Frontend Store Updates (notificationStore.ts)
- Updated to use `isRead` instead of `read`
- Updated to use `_id` instead of `id`
- All field references now match the API spec

### 5. API Specification Updates (spec.yaml)
- Changed `id` to `_id` to match MongoDB's default field name
- Updated example values to use MongoDB ObjectId format

## Migration Process

### Running the Migration Script
```bash
# Set your MongoDB connection string
export MONGODB_URI="your_mongodb_connection_string"

# Run the migration script
node src/scripts/migrateNotifications.js
```

### What the Migration Does
1. Updates existing `read` fields to `isRead`
2. Converts `access-request` types to `access_request`
3. Adds missing `message`, `title`, and `metadata` fields
4. Preserves existing data structure for backward compatibility

### Pre-Migration Checklist
- [ ] Backup your database
- [ ] Stop the application
- [ ] Run the migration script
- [ ] Verify the migration completed successfully
- [ ] Restart the application

### Post-Migration Verification
1. Check that notifications are being created with the new schema
2. Verify that the frontend can read and update notifications
3. Test the notification API endpoints
4. Ensure real-time notifications still work

## API Specification Compliance

The notification system now fully complies with the OpenAPI specification:

### Notification Object Structure
```typescript
{
  _id: string;                     // MongoDB ObjectId
  userId: string;                  // User ID
  type: "access_request" | "access_granted" | "access_denied" | 
        "access_suspended" | "restaurant_update" | "system";
  title?: string;                  // Optional title
  message: string;                 // Required message
  isRead: boolean;                 // Read status
  metadata?: object;               // Additional data
  createdAt: string;               // ISO date string
  updatedAt: string;               // ISO date string
}
```

### API Endpoints
- `GET /api/notifications/{userId}` - Get user notifications
- `PATCH /api/notifications/{userId}/{notificationId}/read` - Mark single notification as read
- `PATCH /api/notifications/{userId}/read-all` - Mark all notifications as read

## Breaking Changes
- Field name changes require frontend updates
- Type enum values have changed
- Response structure is now standardized
- Uses `_id` instead of `id` for consistency with MongoDB

## Rollback Plan
If issues occur, you can rollback by:
1. Restoring the database backup
2. Reverting the code changes
3. Running the application with the old schema 