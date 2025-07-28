import type { 
  CreateCourseRequest, 
  CreateCourseResponse,
  DeleteCourseResponse,
  GetAllCoursesResponse,
  GetCourseByIdResponse,
  UpdateCourseRequest,
  UpdateCourseResponse
} from "shared/types/courses";
import { create } from "zustand";
import { handleApiError } from "../utils/apiErrorHandler";
import apiClient from "../utils/authClient";

type CourseStore = {
  // State
  courses: GetAllCoursesResponse;
  isLoading: boolean;
  error: string | null;

  // Actions
  createCourse: (course: CreateCourseRequest) => Promise<CreateCourseResponse | null>;
  getCourses: (onSuccess?: (courses: GetAllCoursesResponse) => void) => Promise<GetAllCoursesResponse>;
  getCourse: (id: string) => Promise<GetCourseByIdResponse | null>;
  updateCourse: (id: string, course: UpdateCourseRequest) => Promise<UpdateCourseResponse | null>;
  deleteCourse: (id: string) => Promise<DeleteCourseResponse | null>;
  resetCourses: () => void;
};

const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  isLoading: false,
  error: null,

  createCourse: async (course: CreateCourseRequest) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.post<CreateCourseResponse>("/courses", course);

      // Update the courses list with the new course
      set((state) => ({
        courses: [...state.courses, response.data],
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  getCourses: async (onSuccess) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.get<GetAllCoursesResponse>("/courses");

      set({ courses: response.data, isLoading: false });
      onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return [];
    }
  },

  getCourse: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.get<GetCourseByIdResponse>(`/courses/${id}`);

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  updateCourse: async (id: string, course: UpdateCourseRequest) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.put<UpdateCourseResponse>(`/courses/${id}`, course);

      // Update the course in the list
      set((state) => ({
        courses: state.courses.map((item) => 
          item._id === id ? response.data : item
        ),
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  deleteCourse: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await apiClient.delete<DeleteCourseResponse>(`/courses/${id}`);

      // Remove the course from the list
      set((state) => ({
        courses: state.courses.filter((course) => course._id !== id),
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      return null;
    }
  },

  resetCourses: () =>
    set({ courses: [], error: null, isLoading: false }),
}));

export default useCourseStore;
