// Courses DELETE Types - All courses delete-related request, response, and error types
import type { paths } from '../api';

// Request
export type DeleteCourseRequest = paths['/api/courses/{id}']['delete']['parameters']['path'];

// Response
export type DeleteCourseResponse = paths['/api/courses/{id}']['delete']['responses']['200']['content']['application/json']; 