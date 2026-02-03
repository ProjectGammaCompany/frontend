import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile";

export const useProfileData = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    select: (data) => data.data,
  });
};
