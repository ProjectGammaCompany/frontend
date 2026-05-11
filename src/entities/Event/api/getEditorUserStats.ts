import { axiosInstance } from "@/shared/api/axios";

interface GetEditorUserStats {
  blocks: PassedBlock[];
}

export interface PassedBlock {
  id: string;
  name: string;
  tasks: PassedTask[];
}

export interface PassedTask {
  id: string;
  name: string;
  type: number;
  status: "correct" | "incorrect" | "partial";
  options: TaskOption[];
  userAnswers: string[]; //если choice, то id выбранных options
  userPoints: number;
  points: number;
}

export interface TaskOption {
  id: string;
  value: string;
  isCorrect: boolean;
}
export const getEditorUserStats = (eventId: string, userId: string) => {
  return axiosInstance.get<GetEditorUserStats>(
    `event/${eventId}/editorStats/${userId}`,
  );
};
