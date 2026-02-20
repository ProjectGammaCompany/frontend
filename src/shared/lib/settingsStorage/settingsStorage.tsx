import Cookies from "js-cookie";
import type { SettingsStorage } from "./types";

export const settingsStorage: SettingsStorage = {
  setRememberMe() {
    Cookies.set("rememberMe", "true");
  },
  getRememberMe() {
    return Cookies.get("rememberMe");
  },
  clearRememberMe() {
    Cookies.remove("rememberMe");
  },
};
