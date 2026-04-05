import { queryClient } from "@/shared/api";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

export const ReactQueryWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
