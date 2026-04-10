import { useMutation } from "@tanstack/react-query";
import type { TaskFormData } from "../api/createTask";

export const useFormSubmit = <TResponse>(
  mutationFn: (data: TaskFormData) => Promise<TResponse>,
  onSuccess?: (response: TResponse, variables: TaskFormData) => void,
  onError?: () => void,
) => {
  return useMutation<TResponse, Error, TaskFormData>({
    mutationFn: (data) => mutationFn(data),
    onSuccess,
    onError,
  });
};
