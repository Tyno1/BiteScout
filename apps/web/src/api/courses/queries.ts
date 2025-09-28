import type {
  CreateCourseRequest,
  CreateCourseResponse,
  DeleteCourseResponse,
  GetAllCoursesResponse,
  GetCourseByIdResponse,
  UpdateCourseRequest,
  UpdateCourseResponse,
} from "shared/types/courses";
import apiClient from "@/utils/authClient";

// Course Queries
export const getAllCourses = async (): Promise<GetAllCoursesResponse> => {
  const response = await apiClient.get<GetAllCoursesResponse>("/courses");
  return response.data;
};

export const getCourseById = async (id: string): Promise<GetCourseByIdResponse> => {
  const response = await apiClient.get<GetCourseByIdResponse>(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: CreateCourseRequest): Promise<CreateCourseResponse> => {
  const response = await apiClient.post<CreateCourseResponse>("/courses", course);
  return response.data;
};

export const updateCourse = async (
  id: string,
  course: UpdateCourseRequest
): Promise<UpdateCourseResponse> => {
  const response = await apiClient.put<UpdateCourseResponse>(`/courses/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<DeleteCourseResponse> => {
  const response = await apiClient.delete<DeleteCourseResponse>(`/courses/${id}`);
  return response.data;
};
