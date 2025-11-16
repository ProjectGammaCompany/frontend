import { tokenStorage } from "../../lib/tokenStorage/tokenStorage";
import { createAxiosInstance } from "./createAxiosInstance";

const axiosInstance = createAxiosInstance(tokenStorage);

export { axiosInstance, createAxiosInstance };
