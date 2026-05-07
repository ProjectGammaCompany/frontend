import type { GetProfileResponse } from "@/entities/User";
import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { setAvatar } from "../api/setAvatar";

export const useSetAvatar = () => {
  return useMutation({
    mutationKey: ["avatar"],
    mutationFn: setAvatar,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["profile"],
        (oldData: AxiosResponse<GetProfileResponse>) => {
          return oldData
            ? {
                ...oldData,
                data: {
                  ...oldData.data,
                  avatar: variables,
                },
              }
            : oldData;
        },
      );
    },
  });
};
