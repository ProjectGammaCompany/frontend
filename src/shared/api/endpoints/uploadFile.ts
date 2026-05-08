import { axiosInstance } from "../axios";

export type UploadFileResponse = string;
export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosInstance.post<UploadFileResponse>("file", formData);
};
