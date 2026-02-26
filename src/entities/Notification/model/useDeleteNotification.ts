import { useMutation } from "@tanstack/react-query";
import { deleteNotification } from "../api/deleteNotification";

export const useDeleteNotification = (onSuccess: (id: string) => void) => {
  return useMutation<unknown, Error, string>({
    mutationFn: (id) => deleteNotification(id),
    onSuccess: (_, id) => onSuccess(id),
  });
};
