import { useMutation } from "@tanstack/react-query";
import type { ConditionData } from "../api/createCondition";

export const useFormSubmit = <TResponse>(
  mutationFn: (values: ConditionData) => Promise<TResponse>,
  onSuccessFn:
    | ((response: TResponse, variables: ConditionData) => void)
    | undefined,
) => {
  return useMutation({
    mutationFn: mutationFn,
    onSuccess: onSuccessFn,
  });
};
