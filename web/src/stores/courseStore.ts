import type { 
  CreateCourseRequest, 
  CreateCourseResponse,
  DeleteCourseResponse,
  GetAllCoursesResponse,
  GetCourseByIdResponse,
  UpdateCourseRequest,
  UpdateCourseResponse
} from "@shared/types/courses";
import axios from "axios";
import { create } from "zustand";
import { handleApiError } from "../utils/apiErrorHandler";

type CourseStore = {
  // State
  courses: GetAllCoursesResponse;
  isLoading: boolean;
  error: string | null;

  // Actions
  createCourse: (course: CreateCourseRequest) => Promise<CreateCourseResponse | null>;
  getCourses: () => Promise<GetAllCoursesResponse>;
  getCourse: (id: string) => Promise<GetCourseByIdResponse | null>;
  updateCourse: (id: string, course: UpdateCourseRequest) => Promise<UpdateCourseResponse | null>;
  deleteCourse: (id: string) => Promise<DeleteCourseResponse | null>;
  resetCourses: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  createCourse: async (course: CreateCourseRequest) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.post<CreateCourseResponse>(`${API_URL}/courses`, course);

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

  getCourses: async () => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get<GetAllCoursesResponse>(`${API_URL}/courses`);

      set({ courses: response.data, isLoading: false });
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

      const response = await axios.get<GetCourseByIdResponse>(`${API_URL}/courses/${id}`);

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

      const response = await axios.put<UpdateCourseResponse>(`${API_URL}/courses/${id}`, course);

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

      const response = await axios.delete<DeleteCourseResponse>(`${API_URL}/courses/${id}`);

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
