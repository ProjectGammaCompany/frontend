export interface SettingsStorage {
  setRememberMe: () => void;
  getRememberMe: () => string | undefined;
  clearRememberMe: () => void;
}
