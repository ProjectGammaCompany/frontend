import { useMutation } from "@tanstack/react-query";
import type { FullTaskData } from "../api/createTask";

export const useFormSubmit = <TResponse>(
  mutationFn: (data: FullTaskData) => Promise<TResponse>,
  onSuccess?: (response: TResponse, variables: FullTaskData) => void,
  onError?: () => void,
) => {
  return useMutation<TResponse, Error, FullTaskData>({
    mutationFn: (data) => mutationFn(data),
    onSuccess,
    onError,
  });
};
