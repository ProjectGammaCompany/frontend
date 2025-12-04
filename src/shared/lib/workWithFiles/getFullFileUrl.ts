export const getFullFileUrl = (url: string) => {
  return import.meta.env.VITE_FILE_BASE_URL + url;
};
