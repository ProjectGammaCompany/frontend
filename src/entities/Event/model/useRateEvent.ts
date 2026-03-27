import { useMutation } from "@tanstack/react-query";
import { rateEvent } from "../api/rateEvent";

export const useRateEvent = (
  eventId: string,
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation<unknown, Error, number>({
    mutationFn: (value) => rateEvent(eventId, value),
    onSuccess,
    onError,
  });
};
