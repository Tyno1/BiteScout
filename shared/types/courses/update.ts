// Courses UPDATE Types - All courses update-related request, response, and error types
import type { paths } from '../api';

// Request
export type UpdateCourseRequest = paths['/api/courses/{id}']['put']['requestBody']['content']['application/json'];

// Response
export type UpdateCourseResponse = paths['/api/courses/{id}']['put']['responses']['200']['content']['application/json']; 