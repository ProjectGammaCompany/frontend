import { blockQueries, type UseConditionsData } from "@/entities";
import { queryClient } from "@/shared/api";

export const updateGroupsInConditionsQuery = (
  eventId: string,
  blockId: string,
  id: string,
  groups: string[],
) => {
  queryClient.setQueryData(
    blockQueries.getConditions(eventId, blockId),
    (oldData: UseConditionsData) => {
      if (!oldData) {
        return oldData;
      }
      const newData: UseConditionsData = {
        ...oldData,
        data: {
          conditions: oldData.data.conditions.map((condition) => {
            if (condition.id === id) {
              return {
                ...condition,
                group: groups,
              };
            }
            return condition;
          }),
        },
      };
      return newData;
    },
  );
};
