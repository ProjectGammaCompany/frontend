import { useUpdateBlockSettings, type UpdateBlockData } from "@/entities";

export const useFormSubmit = (
  eventId: string,
  blockId: string,
  onSuccess?: (variables?: UpdateBlockData) => void,
  onError?: () => void,
) => {
  return useUpdateBlockSettings(eventId, blockId, onSuccess, onError);
};
