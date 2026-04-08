import type { PickPartial } from "@/shared/lib";
import { useMutation } from "@tanstack/react-query";
import type { ServerOption } from "../api/getEditorTaskData";

export type ClientOption = PickPartial<ServerOption, "id"> & {
  clientId: string;
};

export interface TaskFormData {
  description?: string;
  type: number;
  options?: ClientOption[];
  files: string[];
  points?: number;
  time: number;
  partialPoints?: boolean;
  name: string;
}

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
