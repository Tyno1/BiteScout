// Get User Profile Types - GET /api/user-profile/{userId} request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type GetUserProfileRequest = paths["/api/user-profile/{userId}"]["get"]["parameters"]["path"];
export type GetUserProfileResponse = paths["/api/user-profile/{userId}"]["get"]["responses"]["200"]["content"]["application/json"];
