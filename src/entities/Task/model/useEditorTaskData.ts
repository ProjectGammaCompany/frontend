import { useQuery } from "@tanstack/react-query";
import { getEditorTaskData } from "..";
import { taskQueries } from "../api/queries";

export const useEditorTaskData = (
  mode: string,
  eventId: string,
  blockId: string,
  id?: string,
) => {
  return useQuery({
    queryKey: taskQueries.editorTaskData(eventId, blockId, id!),
    queryFn: () => {
      return getEditorTaskData(eventId, blockId, id!);
    },
    select: (data) => data.data,
    enabled: mode === "edit" && !!id,
  });
};
