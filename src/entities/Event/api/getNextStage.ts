import { axiosInstance } from "@/shared/api/axios";

export type GetNextStageResponse = TaskStage | BlockStage | EndStage;

export interface EndStage {
  type: "end";
}

export interface TaskStage {
  type: "task";
  task: TaskStageData;
}

export interface TaskStageData {
  taskId: string;
  blockId: string;
  name: string;
  description?: string;
  type: number;
  options?: TaskOption[];
  files: TaskStageFile[];
  time?: number;
  timestamp?: string;
}

export interface TaskStageFile {
  url: string;
  name: string;
}

export interface BlockStage {
  type: "block";
  block: {
    blockId: string;
    name: string;
    tasks: TaskItem[];
  };
}
export interface TaskOption {
  id: string;
  value: string;
}

export interface TaskItem {
  id: string;
  name: string;
  type: number;
  time?: number;
  isCompleted: boolean;
  description?: string;
}
export const getNextStage = (eventId: string) => {
  return axiosInstance.get<GetNextStageResponse>(`event/${eventId}/nextStage`);
};
