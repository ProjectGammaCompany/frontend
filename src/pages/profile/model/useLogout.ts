import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logout";

export const useLogout = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: onSuccess,
  });
};
