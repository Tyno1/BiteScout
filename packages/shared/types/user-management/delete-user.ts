// Delete User Types - DELETE /api/user-management/{userId} request and response types
import type { paths } from '../api';

// Extract types from the generated paths
export type DeleteUserRequest = paths["/api/user-management/{userId}"]["delete"]["parameters"]["path"];
export type DeleteUserResponse = paths["/api/user-management/{userId}"]["delete"]["responses"]["200"]["content"]["application/json"];
