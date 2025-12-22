import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { uploadFile, type UploadFileResponse } from "../../api";

export const useFileUpload = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: AxiosResponse<UploadFileResponse, any, object>) => void,
) => {
  return useMutation({
    mutationKey: ["fileUpload"],
    mutationFn: uploadFile,
    onSuccess: onSuccess,
  });
};
