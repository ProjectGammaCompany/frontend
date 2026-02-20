import { useUpdateBlockSettings } from "@/src/entities";

export const useFormSubmit = (
  eventId: string,
  blockId: string,
  onSuccess?: () => void,
) => {
  return useUpdateBlockSettings(eventId, blockId, onSuccess);
};
