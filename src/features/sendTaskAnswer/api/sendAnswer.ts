import { axiosInstance } from "@/src/shared/api";

export interface SendAnswerResponse {
  rightAnswer?: string[];
  rightAnswerId?: string[];
  points?: number;
  status: "correct" | "incorrect" | "partially";
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
