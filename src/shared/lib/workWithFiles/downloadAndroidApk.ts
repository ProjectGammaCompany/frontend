import { handleDownload } from "./handleDownload";

export const downloadApk = () => {
  void handleDownload("eduplay.apk", "EduPlay.apk");
};
