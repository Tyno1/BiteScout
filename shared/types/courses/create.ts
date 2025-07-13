// Courses CREATE Types - All courses creation-related request, response, and error types
import type { paths } from '../api';

// Request
export type CreateCourseRequest = paths['/api/courses']['post']['requestBody']['content']['application/json'];

// Response
export type CreateCourseResponse = paths['/api/courses']['post']['responses']['201']['content']['application/json']; 