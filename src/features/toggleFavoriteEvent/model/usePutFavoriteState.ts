import { useMutation } from "@tanstack/react-query";
import { putFavoriteState } from "../api/putFavoriteState";

export const usePutFavoriteState = (
  id: string,
  value: boolean,
  onSuccess: () => void,
  onError?: () => void,
) => {
  return useMutation({
    mutationFn: () => putFavoriteState(id, value),
    onSuccess,
    onError,
  });
};
