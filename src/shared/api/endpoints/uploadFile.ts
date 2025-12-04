import { axiosInstance } from "../axios/axios";

export interface UploadFileResponse {
  url: string;
}
export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post<UploadFileResponse>("file", formData);
};
