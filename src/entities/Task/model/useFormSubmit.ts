import type { PickPartial } from "@/src/shared/lib";
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
}

export type FullTaskData = TaskFormData & { name: string };

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
