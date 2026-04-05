import { axiosInstance } from "@/shared/api";

export interface Tag {
  id: string;
  name: string;
}

interface getTagsResponse {
  tags: Tag[];
}
export const getTags = () => {
  return axiosInstance.get<getTagsResponse>("tags");
};
