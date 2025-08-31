// Get User By ID Types - GET /api/user-management/{userId} request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type GetUserByIdRequest = paths["/api/user-management/{userId}"]["get"]["parameters"]["path"];
export type GetUserByIdResponse = paths["/api/user-management/{userId}"]["get"]["responses"]["200"]["content"]["application/json"];
