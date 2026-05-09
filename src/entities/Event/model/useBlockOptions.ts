import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getBlocksOptions, type BlockOption } from "../api/getBlocksOptions";
import { eventQueries } from "../api/queries";

export function useBlockOptions(eventId: string): UseQueryResult<BlockOption[]>;

export function useBlockOptions<T>(
  eventId: string,
  mapper: (data: BlockOption[]) => T,
): UseQueryResult<T>;

export function useBlockOptions<T>(
  eventId: string,
  mapper?: (data: BlockOption[]) => T,
) {
  return useQuery({
    queryKey: eventQueries.getBlockOptions(eventId),
    queryFn: () => getBlocksOptions(eventId),
    select: (data) => {
      const selectedData = data.data.blocks;
      if (mapper) {
        return mapper(selectedData);
      }
      return selectedData;
    },
  });
}
