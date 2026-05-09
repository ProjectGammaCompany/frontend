import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getEditingEventSettings,
  type EditingEventSettings,
} from "../api/getEditingEventSettings";
import { eventQueries } from "../api/queries";
export function useEditingEventSettings(
  eventId: string,
  enabled?: boolean,
): UseQueryResult<EditingEventSettings>;

export function useEditingEventSettings<T>(
  eventId: string,
  enabled?: boolean,
  mapper?: (data: EditingEventSettings) => T,
): UseQueryResult<T>;

export function useEditingEventSettings<T>(
  eventId: string,
  enabled?: boolean,
  mapper?: (settings: EditingEventSettings) => T,
) {
  return useQuery({
    queryKey: eventQueries.getSettings(eventId),
    queryFn: () => getEditingEventSettings(eventId),
    select: (data) => {
      if (mapper) {
        return mapper(data.data);
      }
      return data.data;
    },
    enabled,
  });
}
