import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { logout } from "./api/logout";

export const HomePage = () => {
  return (
    <div>
      <h1>Домашняя страница</h1>
      <button
        onClick={() => {
          //TODO переместить logout в страницу профиля. Просто тестовый, если CI/CD настроится раньше выкатки профиля
          void logout().then(() => {
            tokenStorage.clearTokens();
            settingsStorage.clearRememberMe();
          });
        }}
      >
        Выйти
      </button>
    </div>
  );
};
