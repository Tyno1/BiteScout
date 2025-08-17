// Get User Stats Types - GET /api/user-management/stats request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type GetUserStatsRequest = Record<string, never>; // No parameters for this endpoint
export type GetUserStatsResponse = paths["/api/user-management/stats"]["get"]["responses"]["200"]["content"]["application/json"];
