import { getFullFileUrl } from "./getFullFileUrl";

export const handleDownload = async (
  path: string,
  name: string,
  setLoading?: (value: boolean) => void,
) => {
  setLoading?.(true);
  const response = await fetch(getFullFileUrl(path));
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setLoading?.(false);
  window.URL.revokeObjectURL(url);
};
