import { deleteUser, updateUser } from "@/api/user-management/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserRequest } from "shared/types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserRequest;
    }) => updateUser(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user-management"] });
      queryClient.invalidateQueries({
        queryKey: ["user-management", variables.userId],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-management"] });
    },
  });
};
