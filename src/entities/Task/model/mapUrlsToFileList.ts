import { getFullFileUrl } from "@/shared/lib";
import type { UploadFile } from "antd";
import type { TaskFile } from "../api/createTask";

export const mapUrlsToFileList = (files: TaskFile[]): UploadFile[] =>
  files.map((file, index) => {
    return {
      uid: `${index}`,
      name: file.name,
      status: "done",
      url: file.url,
      thumbUrl: getFullFileUrl(file.url),
    };
  });
