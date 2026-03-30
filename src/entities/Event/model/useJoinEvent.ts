import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import {
  type JoinDetails,
  joinEvent,
  type JoinEventResponse,
} from "../api/joinEvent";

export type UseJoinEventResponse = AxiosResponse<JoinEventResponse>;
export const useJoinEvent = (
  joinCode: string,
  onSuccess: (response: UseJoinEventResponse) => void,
  onError: (error: Error) => void,
) => {
  return useMutation<UseJoinEventResponse, Error, JoinDetails>({
    mutationFn: (joinDetails) => joinEvent(joinCode, joinDetails),
    onSuccess,
    onError,
  });
};
