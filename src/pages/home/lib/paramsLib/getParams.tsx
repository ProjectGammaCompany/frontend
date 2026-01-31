import type { Filters } from "../../ui/EventsList/EventsList";
import { PARAMS_KEYS } from "./const";

export const getParams = (params: URLSearchParams) => {
  const parsedParams: Filters = {
    decliningRating: false,
    active: false,
  };
  for (const key of PARAMS_KEYS) {
    if (params.has(key)) {
      if (key === "tags") {
        const tags = params.getAll(key);
        if (tags.length > 0) {
          parsedParams.tags = tags;
        }
        continue;
      }
      parsedParams[key] = Boolean(params.get(key));
    }
  }
  return parsedParams;
};
