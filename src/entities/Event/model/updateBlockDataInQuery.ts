import {
  eventQueries,
  type getEditingEventDataResponse,
} from "@/entities/Event";
import { queryClient } from "@/shared/api/reactQuery";
import type { AxiosResponse } from "axios";

type DataType =
  | {
      key: "isParallel";
      value: boolean;
    }
  | {
      key: "name";
      value: string;
    };
export const updateBlockValueInQuery = (
  eventId: string,
  blockId: string,
  data: DataType,
) => {
  queryClient.setQueryData(
    eventQueries.getEditingEventData(eventId),
    (oldData: AxiosResponse<getEditingEventDataResponse>) => {
      if (!oldData) {
        return oldData;
      }
      const newData: AxiosResponse<getEditingEventDataResponse> = {
        ...oldData,
        data: {
          ...oldData.data,
          blocks: oldData.data.blocks.map((el) => {
            if (el.id === blockId) {
              return {
                ...el,
                name: data.key === "name" ? data.value : el.name,
                isParallel:
                  data.key === "isParallel" ? data.value : el.isParallel,
              };
            }
            return el;
          }),
        },
      };
      return newData;
    },
  );
};
