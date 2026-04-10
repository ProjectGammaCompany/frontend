import type { UploadFile } from "antd";
import type { TaskFile } from "../api/createTask";

export const mapUrlsToFileList = (files: TaskFile[]): UploadFile[] =>
  files.map((file, index) => ({
    uid: `${index}`,
    name: file.name,
    status: "done",
    url: file.url,
  }));
