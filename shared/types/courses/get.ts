// Courses GET Types - All courses get-related request, response, and error types
import type { paths } from '../api';

// Get All Courses
export type GetAllCoursesResponse = paths['/api/courses']['get']['responses']['200']['content']['application/json'];

// Get Course By ID
export type GetCourseByIdRequest = paths['/api/courses/{id}']['get']['parameters']['path'];
export type GetCourseByIdResponse = paths['/api/courses/{id}']['get']['responses']['200']['content']['application/json']; 