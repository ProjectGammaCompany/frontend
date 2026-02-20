import { axiosInstance } from "@/src/shared/api";

export interface AddBlockResponse {
  blockId: string;
}

export interface AddBlockProps {
  eventId: string;
  isParallel: boolean;
  name: string;
  order: number;
}
export const addBlock = ({
  eventId,
  isParallel,
  name,
  order,
}: AddBlockProps) => {
  return axiosInstance.post<AddBlockResponse>(`event/${eventId}/block`, {
    name,
    isParallel,
    order,
  });
};
