import { useUpdateBlockSettings } from "@/entities";

export const useFormSubmit = (
  eventId: string,
  blockId: string,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  return useUpdateBlockSettings(eventId, blockId, onSuccess, onError);
};
