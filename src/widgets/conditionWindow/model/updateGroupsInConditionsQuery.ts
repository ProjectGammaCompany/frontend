import { type UseConditionsData, blockQueries } from "@/entities/Block";
import { queryClient } from "@/shared/api/reactQuery";

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
