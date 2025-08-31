# User Management Types - Following Allergen Controller Pattern

## Overview
This document shows how to use the new strongly typed user management types following the same pattern as the allergen controller.

## Type Structure

### 1. User Management Types (`/types/user-management/`)
- **`GetAllUsersRequest`** - Query parameters for getting all users
- **`GetAllUsersResponse`** - Response with users array and pagination
- **`GetUserByIdRequest`** - Path parameter for getting specific user
- **`GetUserByIdResponse`** - Response with single user and restaurant access details
- **`UpdateUserRequest`** - Request body for updating user (admin operation)
- **`UpdateUserResponse`** - Response with success message and updated user
- **`DeleteUserRequest`** - Path parameter for deleting user
- **`DeleteUserResponse`** - Response with success message and deleted user info
- **`GetUserStatsRequest`** - No parameters needed for stats
- **`GetUserStatsResponse`** - Response with user statistics and breakdowns

### 2. User Profile Types (`/types/user-profile/`)
- **`GetUserProfileRequest`** - Path parameter for getting own profile
- **`GetUserProfileResponse`** - Response with user profile data
- **`UpdateUserProfileRequest`** - Request body for updating own profile (non-sensitive fields)
- **`UpdateUserProfileResponse`** - Response with success message and updated profile
- **`ChangePasswordRequest`** - Request body for changing password
- **`ChangePasswordResponse`** - Response with success message

## Usage in Controllers

### Before (Without Types):
```typescript
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // No type safety
};
```

### After (With Types - Following Allergen Pattern):
```typescript
import type {
  GetAllUsersRequest,
  GetAllUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserStatsResponse
} from "shared/types/user-management";
import type { ApiError } from "shared/types/common/errors";

// Define union types for API responses
type GetAllUsersApiResponse = GetAllUsersResponse | ApiError;
type GetUserByIdApiResponse = GetUserByIdResponse | ApiError;
type UpdateUserApiResponse = UpdateUserResponse | ApiError;
type DeleteUserApiResponse = DeleteUserResponse | ApiError;
type GetUserStatsApiResponse = GetUserStatsResponse | ApiError;

export const getAllUsers = async (
  req: Request<Record<string, never>, unknown, GetAllUsersRequest>,
  res: Response<GetAllUsersApiResponse>,
  next: NextFunction
) => {
  try {
    // Strongly typed request parameters
    const { page, limit, search, userType, status } = req.query;
    
    // ... business logic ...
    
    // Strongly typed response
    res.status(200).json({
      users: usersWithAccess,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNextPage: page * limit < totalUsers,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};
```

## Benefits of This Pattern

### 1. **Type Safety**
- Request parameters are validated at compile time
- Response structures are guaranteed to match the API contract
- No more runtime errors from mismatched data structures

### 2. **Consistency**
- Same pattern across all controllers (allergen, user management, etc.)
- Unified error handling with `ApiError` union types
- Consistent function signatures

### 3. **Developer Experience**
- IntelliSense support for all request/response properties
- Automatic validation of required vs optional fields
- Clear API contract documentation

### 4. **Maintainability**
- Single source of truth for API types
- Easy to update types when API changes
- Frontend can import and use the same types

## Example Controller Implementation

```typescript
// userManagementController.ts
import type {
  GetAllUsersRequest,
  GetAllUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserStatsResponse
} from "shared/types/user-management";
import type { ApiError } from "shared/types/common/errors";
import { ErrorCodes, createError } from "../middleware/errorHandler.js";

// Union types for API responses
type GetAllUsersApiResponse = GetAllUsersResponse | ApiError;
type GetUserByIdApiResponse = GetUserByIdResponse | ApiError;
type UpdateUserApiResponse = UpdateUserResponse | ApiError;
type DeleteUserApiResponse = DeleteUserResponse | ApiError;
type GetUserStatsApiResponse = GetUserStatsResponse | ApiError;

export const getAllUsers = async (
  req: Request<Record<string, never>, unknown, GetAllUsersRequest>,
  res: Response<GetAllUsersApiResponse>,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as { userId: string; userType: string };
    if (!currentUser || !hasAdminPrivileges(currentUser.userType)) {
      return next(createError(ErrorCodes.FORBIDDEN, "Access denied. Admin privileges required."));
    }

    const { page = 1, limit = 10, search, userType, status } = req.query;
    
    // ... business logic ...
    
    res.status(200).json({
      users: usersWithAccess,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNextPage: page * limit < totalUsers,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};
```

## Migration Steps

1. **Import the types** in your controller
2. **Define union types** for API responses
3. **Update function signatures** with proper generics
4. **Replace manual error handling** with `next(createError(...))`
5. **Update catch blocks** to use `return next(error)`

This pattern ensures your user management controller follows the same high-quality standards as the allergen controller! 🎉
