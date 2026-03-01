import { useMutation } from "@tanstack/react-query";
import { updateGroups } from "../api/updateGroups";

export const useUpdateGroups = (
  eventId: string,
  blockId: string,
  conditionId: string,
  onSuccess: (id: string, groups: string[]) => void,
  onError: () => void,
) => {
  return useMutation<unknown, Error, string[]>({
    mutationFn: (groups) => updateGroups(eventId, blockId, conditionId, groups),
    onSuccess: (_, groups) => onSuccess(conditionId, groups),
    onError,
  });
};
