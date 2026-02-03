import { useMutation } from "@tanstack/react-query";
import type { ServerOption } from "../api/getEditorTaskData";

export type ClientOption = ServerOption & { clientId: string };

export interface TaskFormData {
  description?: string;
  type: number;
  options?: ClientOption[];
  files: string[];
  points?: number;
  time: number;
  partialPoints?: boolean;
}

export type FullTaskData = TaskFormData & { name: string };

export const useFormSubmit = <TResponse>(
  mutationFn: (data: FullTaskData) => Promise<TResponse>,
  onSuccessFn?: (response: TResponse, variables: FullTaskData) => void,
) => {
  return useMutation<TResponse, Error, FullTaskData>({
    mutationFn: (data) => mutationFn(data),
    onSuccess: onSuccessFn,
  });
};
