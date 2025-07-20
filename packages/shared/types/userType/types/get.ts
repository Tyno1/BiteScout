// UserType GET Types - GET /api/user-types request, response, and error types
import type { paths } from '../../api';

// Request (no parameters for this endpoint)
export type GetAllUserTypesRequest = Record<string, never>;

// Response
export type GetAllUserTypesResponse = paths['/api/user-types']['get']['responses']['200']['content']['application/json'];

