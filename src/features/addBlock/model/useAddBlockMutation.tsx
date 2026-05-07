import type {
  BlockItemData,
  getEditingEventDataResponse,
} from "@/entities/Event";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { addBlock, type AddBlockResponse } from "../api/addBlock";

export const useAddBlockMutation = (
  eventId: string,
  blocks: BlockItemData[],
  onError: () => void,
  onBlockCreate?: (blockId: string) => void,
) => {
  return useMutation<
    AxiosResponse<AddBlockResponse>,
    Error,
    { eventId: string; isParallel: boolean; name: string; order: number }
  >({
    mutationKey: ["addBlock", eventId],
    mutationFn: addBlock,
    onError,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        [eventId, "data"],
        (oldData: AxiosResponse<getEditingEventDataResponse>) => {
          if (!oldData) {
            return oldData;
          }
          const newBlock: BlockItemData = {
            id: data.data.blockId,
            name: variables.name,
            order: variables.order,
            conditionsWithoutBlocks: false,
            connectedBlocks: false,
            isParallel: variables.isParallel,
          };
          return {
            ...oldData,
            data: {
              ...oldData.data,
              blocks: [...blocks, newBlock],
            },
          };
        },
      );
      onBlockCreate?.(data.data.blockId);
    },
  });
};
