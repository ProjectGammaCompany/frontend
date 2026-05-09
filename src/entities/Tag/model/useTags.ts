import { useQuery } from "@tanstack/react-query";
import { getTags } from "../api/getTags";
import { tagQueries } from "../api/queries";

export const useTags = () => {
  return useQuery({
    queryKey: tagQueries.getTags(),
    queryFn: getTags,
    select: (data) =>
      data.data.tags.map((tag) => {
        return {
          label: tag.name,
          value: tag.id,
        };
      }),
  });
};
