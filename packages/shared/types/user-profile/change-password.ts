// Change Password Types - PATCH /api/user-profile/{userId}/password request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type ChangePasswordRequest = paths["/api/user-profile/{userId}/password"]["patch"]["requestBody"]["content"]["application/json"];
export type ChangePasswordResponse = paths["/api/user-profile/{userId}/password"]["patch"]["responses"]["200"]["content"]["application/json"];
