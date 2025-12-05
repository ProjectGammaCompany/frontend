import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { uploadFile, type UploadFileResponse } from "../../api";

interface UseFileUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (data: AxiosResponse<UploadFileResponse, any, object>) => void;
}
export const useFileUpload = ({ onSuccess }: UseFileUploadProps) => {
  return useMutation({
    mutationKey: ["fileUpload"],
    mutationFn: uploadFile,
    onSuccess: onSuccess,
  });
};
