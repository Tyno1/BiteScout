import { createCourse, deleteCourse, updateCourse } from "@/api/courses/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCourseRequest, UpdateCourseRequest } from "shared/types/courses";

// Course Mutations
export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (course: CreateCourseRequest) => createCourse(course),
    onSuccess: () => {
      // Invalidate and refetch courses queries
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, course }: { id: string; course: UpdateCourseRequest }) =>
      updateCourse(id, course),
    onSuccess: (data, variables) => {
      // Invalidate and refetch courses queries
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: (data, variables) => {
      // Invalidate and refetch courses queries
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables] });
    },
  });
}; 