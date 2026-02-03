import {
  useMutation,
  type MutationFunctionContext,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { sendAnswer, type SendAnswerResponse } from "../api/sendAnswer";

export const useSendAnswer = (
  eventId: string,
  blockId: string,
  id: string,
  answer: string[],
  onSuccess?: (
    data: AxiosResponse<SendAnswerResponse, unknown, object>,
    variables: void,
    onMutateResult: unknown,
    context: MutationFunctionContext,
  ) => void,
) => {
  return useMutation({
    mutationFn: () => sendAnswer(eventId, blockId, id, answer),
    onSuccess: onSuccess,
  });
};
