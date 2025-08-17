// Update User Types - PUT /api/user-management/{userId} request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type UpdateUserRequest = paths["/api/user-management/{userId}"]["put"]["requestBody"]["content"]["application/json"];
export type UpdateUserResponse = paths["/api/user-management/{userId}"]["put"]["responses"]["200"]["content"]["application/json"];
