import { useMutation } from "@tanstack/react-query";
import { sendCodeByEmail } from "../api/sendCodeByEmail";

export const useSendCodeByEmail = (
  onSuccess: (email: string) => void,
  onError: (error: Error) => void,
) => {
  return useMutation<unknown, Error, string>({
    mutationFn: (email) => sendCodeByEmail(email),
    onSuccess: (_, email) => onSuccess(email),
    onError,
  });
};
