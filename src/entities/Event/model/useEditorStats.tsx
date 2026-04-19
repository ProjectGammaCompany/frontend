import { useQuery } from "@tanstack/react-query";
import type { EditorGroupDTO, EditorUserDTO } from "../api/getEditorStats";
import { getEditorStats } from "../api/getEditorStats";
import { eventQueries } from "../api/queries";

export type EditorGroupStats = EditorGroupDTO;
export type EditorUserStats = EditorUserDTO;
export const useEditorStats = (eventId: string) => {
  return useQuery({
    queryKey: eventQueries.getEditorStats(eventId),
    queryFn: () => getEditorStats(eventId),
    select: (data) => data.data,
  });
};
