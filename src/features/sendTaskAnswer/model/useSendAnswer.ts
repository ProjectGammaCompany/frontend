import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { sendAnswer, type SendAnswerResponse } from "../api/sendAnswer";

export const useSendAnswer = (
  eventId: string,
  blockId: string,
  id: string,
  onSuccess?: (
    data: AxiosResponse<SendAnswerResponse>,
    variables: string[],
  ) => void,
  onError?: () => void,
  onMutate?: () => void,
) => {
  return useMutation<AxiosResponse<SendAnswerResponse>, Error, string[]>({
    mutationFn: (answer) => sendAnswer(eventId, blockId, id, answer),
    onSuccess,
    onError,
    onMutate,
  });
};
