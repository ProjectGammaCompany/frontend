import { isAxiosError, type AxiosError } from "axios";

type StatusHandler<T extends string | void> = (error: AxiosError) => T;

interface HandleErrorOptions<T extends string | void> {
  axiosHandlers?: Record<number, StatusHandler<T>>;
  defaultHandler: (error: Error) => T;
}
export const handleError = <T extends string | void>(
  error: Error,
  options: HandleErrorOptions<T>,
) => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status && options.axiosHandlers?.[status]) {
      return options.axiosHandlers?.[status](error);
    }
    return options.defaultHandler(error);
  }
};
