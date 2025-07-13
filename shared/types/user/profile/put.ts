// User Profile PUT Types - PUT /api/user/{userId} request and response types
import type { paths } from '../../api';

// Request
export type UserProfilePutRequest = paths['/api/user/{userId}']['put']['requestBody']['content']['application/json'];

// Response
export type UserProfilePutResponse = paths['/api/user/{userId}']['put']['responses']['200']['content']['application/json']; 