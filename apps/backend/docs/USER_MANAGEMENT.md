# User Management System

## Overview

The user management system provides two distinct sets of controllers and routes:

1. **User Management** (`/api/user-management`) - Admin operations for managing other users
2. **User Profile** (`/api/user-profile`) - User operations for managing their own profile

## Access Control

### User Management (Admin Only)
- **Required Role**: `admin`, `moderator`, or `root`
- **Purpose**: Manage other users in the system
- **Operations**: View, update, delete, suspend users

### User Profile (Self-Service)
- **Required Role**: Any authenticated user
- **Purpose**: Users manage their own profile
- **Operations**: Update profile, change password, view own profile

## Role Hierarchy

```
root > admin > moderator > user > guest
```

### Permission Matrix

| Current User | Can Modify | Cannot Modify |
|--------------|------------|---------------|
| root | everyone | none |
| admin | user, guest, moderator | admin, root |
| moderator | user, guest | moderator, admin, root |
| user | none | everyone |
| guest | none | everyone |

## API Endpoints

### User Management (`/api/user-management`)

#### GET `/`
- **Description**: Get all users with pagination and filtering
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search by name, email, or username
  - `userType`: Filter by user type
- **Response**: Users with pagination info and restaurant access details

#### GET `/stats`
- **Description**: Get user statistics
- **Response**: Total users, new users this month, breakdown by type and access status

#### GET `/:userId`
- **Description**: Get specific user details
- **Response**: User info with restaurant access details

#### PUT `/:userId`
- **Description**: Update user information
- **Body**: User fields to update
- **Restrictions**: 
  - Root can update any field including `userType`
  - Admin/Moderator cannot update `userType`, `restaurantCount`, or `password`

#### DELETE `/:userId`
- **Description**: Delete user
- **Restrictions**: Cannot delete self, follows permission matrix
- **Side Effects**: Deletes associated restaurant access records

#### Note: User Status Management
- **User suspension is handled at the restaurant access level**
- **Use**: `/api/restaurant-access/{accessId}/suspend` for suspending restaurant access
- **Why**: Users can be suspended from specific restaurants, not globally
- **Benefits**: Granular control, no phantom fields, proper data model alignment

### User Profile (`/api/user-profile`)

#### GET `/:userId`
- **Description**: Get own profile
- **Restrictions**: Can only view own profile

#### PUT `/:userId`
- **Description**: Update own profile
- **Allowed Fields**: `name`, `username`, `phone`, `bio`, `dietaryPreferences`, `location`, `imageUrl`, `notificationSettings`
- **Restrictions**: Cannot update `userType`, `restaurantCount`, `password`

#### PATCH `/:userId/password`
- **Description**: Change own password
- **Body**: `{ "currentPassword": "string", "newPassword": "string" }`
- **Validation**: New password must be at least 6 characters

## Security Features

### Authentication
- All routes require valid JWT token
- Token must be included in `Authorization` header

### Authorization
- Role-based access control (RBAC)
- Users can only access/modify their own data
- Admin operations follow strict permission matrix

### Data Validation
- ObjectId validation for all user IDs
- Field filtering to prevent unauthorized updates
- Unique constraint validation for username and phone

### Audit Trail
- All operations log errors with context
- User actions are tied to authenticated user ID

## Usage Examples

### Admin Getting All Users
```bash
GET /api/user-management?page=1&limit=20&search=john
Authorization: Bearer <admin-jwt-token>
```

### Admin Updating User Role
```bash
PUT /api/user-management/507f1f77bcf86cd799439011
Authorization: Bearer <root-jwt-token>
Content-Type: application/json

{
  "userType": "moderator"
}
```

### User Updating Own Profile
```bash
PUT /api/user-profile/507f1f77bcf86cd799439011
Authorization: Bearer <user-jwt-token>
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Food enthusiast"
}
```

### User Changing Password
```bash
PATCH /api/user-profile/507f1f77bcf86cd799439011/password
Authorization: Bearer <user-jwt-token>
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

## Error Handling

### Common Error Codes
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (user doesn't exist)
- `500`: Internal Server Error

### Error Response Format
```json
{
  "message": "Human readable error message",
  "error": "Technical error details (in development)"
}
```

## Database Models

### User Model
- Core user information
- Role-based access control
- Timestamps for audit trail

### RestaurantAccess Model
- Links users to restaurants
- Role and status information
- Used for access validation

## Future Enhancements

1. **Bulk Operations**: Support for bulk user updates
2. **Advanced Filtering**: More sophisticated search and filter options
3. **Audit Logging**: Detailed audit trail for all user management operations
4. **Rate Limiting**: Prevent abuse of user management endpoints
5. **Webhook Support**: Notify external systems of user changes

## Important Notes

### User Suspension vs. Restaurant Access Suspension
- **User Management Controller**: Handles user profile updates, role changes, and deletion
- **Restaurant Access Controller**: Handles user suspension from specific restaurants
- **No Global User Suspension**: Users are suspended per restaurant, not globally
- **Correct Endpoint**: Use `/api/restaurant-access/{accessId}/suspend` for access control

### Why This Architecture?
1. **Granular Control**: Users can be suspended from Restaurant A but still access Restaurant B
2. **Business Logic**: Access control is restaurant-specific, not user-wide
3. **Data Model**: `RestaurantAccess.status` is the correct field for access control
4. **No Phantom Fields**: Avoids updating non-existent User model fields
