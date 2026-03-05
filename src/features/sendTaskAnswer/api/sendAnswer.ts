import { axiosInstance } from "@/src/shared/api";

export interface SendAnswerResponse {
  rightAnswer?: string[];
  points?: number;
}
export const sendAnswer = (
  eventId: string,
  blockId: string,
  taskId: string,
  answer: string[],
) => {
  return axiosInstance.post<SendAnswerResponse>(
    `event/${eventId}/blocks/${blockId}/tasks/${taskId}/answer`,
    {
      answer,
    },
  );
};
