import { queryClient } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { GetProfileResponse } from "../api/getProfile";
import { setAvatar } from "../api/setAvatar";

export const useSetAvatar = () => {
  return useMutation({
    mutationKey: ["avatar"],
    mutationFn: setAvatar,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["profile"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (oldData: AxiosResponse<GetProfileResponse, any, object>) => {
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
