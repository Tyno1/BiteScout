import { Course } from "@/types/foodCatalogue";
import axios from "axios";
import { create } from "zustand";

type CourseStore = {
  // State
  courses: Course[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createCourse: (course: Course) => Promise<void>;
  getCourses: () => Promise<void>;
  getCourse: (id: string) => Promise<void>;
  updateCourse: ({
    id,
    course,
  }: {
    id: string;
    course: Course;
  }) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  resetCourses: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEFAULT_COURSES = [{ _id: "", name: "", description: "" }];

const useCourseStore = create<CourseStore>((set) => ({
  courses: DEFAULT_COURSES,
  isLoading: false,
  error: null,

  createCourse: async (course: Course) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.post(`${API_URL}/courses`, { course });

      set({ courses: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  getCourses: async () => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get(`${API_URL}/courses`);

      set({ courses: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
      return [];
    }
  },
  getCourse: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.get(`${API_URL}/courses/${id}`);

      set({ courses: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
      return null;
    }
  },

  updateCourse: async ({
    id,
    course,
  }: {
    id: string;
    course: Course;
  }) => {
    try {
      set({ error: null, isLoading: true });

      const response = await axios.put(`${API_URL}/courses/${id}`, {
        course,
      });

      set({ courses: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  deleteCourse: async (id: string) => {
    try {
      set({ error: null, isLoading: true });

      await axios.delete(`${API_URL}/Courses/${id}`);

      set((state) => ({
        Courses: state.courses.filter((course) => course._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error has occurred",
        isLoading: false,
      });
    }
  },

  resetCourses: () =>
    set({ courses: DEFAULT_COURSES, error: null, isLoading: false }),
}));

export default useCourseStore;
