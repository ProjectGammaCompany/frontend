import { isAxiosError, type AxiosError } from "axios";

export const handleError = (
  error: Error,
  onForbidden: (error?: AxiosError) => void,
  onError: (error?: Error) => void,
  onNotFound?: (error?: AxiosError) => void,
  onForbiddenText?: string,
  onNotFoundText?: string,
  onErrorText?: string,
) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status == 403) {
      onForbidden(error);
      return onForbiddenText;
    }
    if (axiosError.response?.status == 404) {
      onNotFound?.(error);
      return onNotFoundText;
    }
  }
  onError(error);
  return onErrorText;
};

export const errorText = (
  error: Error,
  onForbidden: (error?: AxiosError) => void,
  onError: (error?: Error) => void,
  onNotFound?: (error?: AxiosError) => void,
  onForbiddenText?: string,
  onNotFoundText?: string,
  onErrorText?: string,
) => {
  return handleError(
    error,
    onForbidden,
    onError,
    onNotFound,
    onForbiddenText,
    onNotFoundText,
    onErrorText,
  );
};
