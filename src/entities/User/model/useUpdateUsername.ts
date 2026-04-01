import { useMutation } from "@tanstack/react-query";
import { updateUsername } from "../api/updateUsername";

export const useUpdateUsername = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation<unknown, Error, string>({
    mutationFn: (username) => updateUsername(username),
    onSuccess,
    onError,
  });
};
