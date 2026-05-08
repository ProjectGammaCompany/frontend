import type { UploadFileResponse } from "@/shared/api/endpoints";
import { uploadFile } from "@/shared/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

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
