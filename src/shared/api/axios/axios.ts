import { tokenStorage } from "../../lib/";
import { createAxiosInstance } from "./createAxiosInstance";

export const axiosInstance = createAxiosInstance(tokenStorage);
