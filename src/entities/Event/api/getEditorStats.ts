import { axiosInstance } from "@/shared/api/axios";

export interface GetEditorStatsResponse {
  groupEvent: boolean;
  users?: EditorUserDTO[];
  groups?: EditorGroupDTO[];
}

export interface EditorGroupDTO {
  id: string;
  name: string;
  users: EditorUserDTO[];
}

export interface EditorUserDTO {
  id: string;
  username: string;
  answers: {
    correct: number;
    total: number;
  };
  points: number;
  avatar?: string;
}

export const getEditorStats = (eventId: string) => {
  return axiosInstance.get<GetEditorStatsResponse>(
    `event/${eventId}/editorStats`,
  );
};
