import { useEffect } from "react";

export const useTitle = (title: string) => {
  return useEffect(() => {
    document.title = "EduPlay – " + title;
  }, [title]);
};
