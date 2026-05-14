import { useQuery } from "@tanstack/react-query";
import {
  getEditorUserStats,
  type PassedBlock,
} from "../api/getEditorUserStats";
import { eventQueries } from "../api/queries";

export const useEditorUserStats = (eventId: string, userId: string) => {
  return useQuery({
    queryKey: eventQueries.getEditorUserStats(eventId, userId),
    queryFn: () => {
      return getEditorUserStats(eventId, userId);
    },
    select: (data) => {
      const blocks = data.data.blocks;
      const filteredBlocks: PassedBlock[] = [];
      blocks.forEach((block) => {
        const tasks = block.tasks;
        const filteredTasks = tasks.filter((task) => task.id.length);
        if (filteredTasks.length > 0) {
          filteredBlocks.push(
            filteredTasks.length === tasks.length
              ? block
              : {
                  ...block,
                  tasks: filteredTasks,
                },
          );
        }
      });
      return filteredBlocks;
    },
  });
};
