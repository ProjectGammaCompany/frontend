import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile";
import { userQueries } from "../api/queries";

export const useProfileData = () => {
  return useQuery({
    queryKey: userQueries.getProfile(),
    queryFn: getProfile,
    select: (data) => data.data,
  });
};
