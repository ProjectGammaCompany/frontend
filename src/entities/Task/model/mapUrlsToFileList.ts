import type { UploadFile } from "antd";

export const mapUrlsToFileList = (urls: string[]): UploadFile[] =>
  urls.map((url, index) => ({
    uid: `${index}`,
    name: url.split("/").pop() ?? `file-${index}`,
    status: "done",
    url,
  }));
