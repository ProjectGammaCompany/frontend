import { tokenStorage } from "@/shared/lib/tokenStorage";
import { createAxiosInstance } from "./createAxiosInstance";

export const axiosInstance = createAxiosInstance(tokenStorage);
