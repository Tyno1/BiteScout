// UserType Get By Name Types - GET /api/user-types/{userType} request and response types
import type { paths } from '../../api';

// Request
export type UserTypeGetByNameRequest = paths['/api/user-types/{userType}']['get']['parameters']['path'];

// Response
export type UserTypeGetByNameResponse = paths['/api/user-types/{userType}']['get']['responses']['200']['content']['application/json']; 