import type { Filters } from "../../model/useAllEvents";

export const getParams = (params: URLSearchParams) => {
  const parsedParams: Filters = {
    decliningRating: false,
    active: false,
    favorites: false,
    tags: [],
    title: "",
  };
  for (const key of Object.keys(parsedParams)) {
    if (params.has(key)) {
      if (key === "tags") {
        const tags = params.getAll(key);
        if (tags.length > 0) {
          parsedParams.tags = tags;
        }
        continue;
      }
      if (key === "title") {
        const title = params.get(key);
        if (title) {
          parsedParams.title = title;
        }
        continue;
      }
      parsedParams[
        key as Exclude<keyof typeof parsedParams, "tags" | "title">
      ] = params.get(key) ? params.get(key)?.toLowerCase() === "true" : false;
    }
  }
  return parsedParams;
};
