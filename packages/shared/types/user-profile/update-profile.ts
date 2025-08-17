// Update User Profile Types - PUT /api/user-profile/{userId} request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type UpdateUserProfileRequest = paths["/api/user-profile/{userId}"]["put"]["requestBody"]["content"]["application/json"];
export type UpdateUserProfileResponse = paths["/api/user-profile/{userId}"]["put"]["responses"]["200"]["content"]["application/json"];
