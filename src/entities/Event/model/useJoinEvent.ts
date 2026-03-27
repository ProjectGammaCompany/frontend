import { handleError } from "@/src/shared/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import {
  type JoinDetails,
  joinEvent,
  type JoinEventResponse,
} from "../api/joinEvent";

export type UseJoinEventResponse = AxiosResponse<JoinEventResponse>;
export const useJoinEvent = (
  joinCode: string,
  onSuccess: (response: UseJoinEventResponse) => void,
  onForbidden: (error?: AxiosError) => void,
  onError: (error?: Error) => void,
) => {
  return useMutation<UseJoinEventResponse, Error, JoinDetails>({
    mutationFn: (joinDetails) => joinEvent(joinCode, joinDetails),
    onSuccess,
    onError: (error) => handleError(error, onForbidden, onError),
  });
};
