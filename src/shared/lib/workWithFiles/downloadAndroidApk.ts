import { handleDownload } from "./handleDownload";

export const downloadApk = (setLoading: (value: boolean) => void) => {
  void handleDownload("eduplay.apk", "EduPlay.apk", setLoading);
};
