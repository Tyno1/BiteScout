// Get All Users Types - GET /api/user-management request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type GetAllUsersRequest = paths["/api/user-management"]["get"]["parameters"]["query"];
export type GetAllUsersResponse = paths["/api/user-management"]["get"]["responses"]["200"]["content"]["application/json"];
