import { useQuery } from "@tanstack/react-query";
import type { EditorGroupDTO, EditorUserDTO } from "../api/getEditorStats";
import { getEditorStats } from "../api/getEditorStats";
import { eventQueries } from "../api/queries";

export type EditorGroupStats = EditorGroupDTO;
export type EditorUserStats = EditorUserDTO;

const sortByPoints = (a: EditorUserStats, b: EditorUserStats) =>
  b.points - a.points;
export const useEditorStats = (eventId: string) => {
  return useQuery({
    queryKey: eventQueries.getEditorStats(eventId),
    queryFn: () => getEditorStats(eventId),
    select: (data) => {
      const body = data.data;

      return {
        ...body,
        groups: body.groups?.map((group) => ({
          ...group,
          users: [...group.users].sort(sortByPoints),
        })),
        users: body.users ? [...body.users].sort(sortByPoints) : undefined,
      };
    },
  });
};
