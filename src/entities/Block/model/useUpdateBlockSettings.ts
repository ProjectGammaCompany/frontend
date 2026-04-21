import { useMutation } from "@tanstack/react-query";
import {
  updateBlockSettings,
  type UpdateBlockData,
} from "../api/updateBlockSettings";

export const useUpdateBlockSettings = (
  eventId: string,
  blockId: string,
  onSuccess?: (variables?: UpdateBlockData) => void,
  onError?: () => void,
) => {
  return useMutation<unknown, Error, UpdateBlockData>({
    mutationFn: (data) => updateBlockSettings(eventId, blockId, data),
    onSuccess: (_data, variables) => onSuccess?.(variables),
    onError,
  });
};
