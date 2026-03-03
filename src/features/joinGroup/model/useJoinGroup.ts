import { useMutation } from "@tanstack/react-query";
import { joinGroup, type GroupData } from "../api/joinGroup";

export const useJoinGroup = (eventId: string, onSuccess: () => void) => {
  return useMutation<unknown, Error, GroupData>({
    mutationFn: (groupData) => joinGroup(eventId, groupData),
    onSuccess,
  });
};
