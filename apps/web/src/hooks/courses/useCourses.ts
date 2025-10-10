import { useQuery } from "@tanstack/react-query";
import { getAllCourses, getCourseById } from "@/api/courses/queries";

// Course Query Hooks
export const useCourses = (enabled = true) => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCourseById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
