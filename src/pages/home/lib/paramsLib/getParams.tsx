import type { Filters } from "../../model/useAllEvents";

export const getParams = (params: URLSearchParams) => {
  const parsedParams: Filters = {
    decliningRating: false,
    active: false,
    favorites: false,
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
      parsedParams[key as Exclude<keyof typeof parsedParams, "tags">] = Boolean(
        params.get(key),
      );
    }
  }
  return parsedParams;
};
