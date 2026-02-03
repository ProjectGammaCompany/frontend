import type { UploadFile } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNormalizedFileList = (fileList: UploadFile<any>[]) => {
  return fileList.map((file) => {
    if (
      file.response &&
      typeof file.response === "object" &&
      "url" in file.response &&
      typeof (file.response as { url: unknown }).url === "string"
    ) {
      return {
        ...file,
        url: (file.response as { url: string }).url,
      };
    }
    return file;
  });
};
