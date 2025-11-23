import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { logout } from "../api/logout";
import { getParams } from "../lib/paramsLib/getParams";
import EventsList from "./EventsList/EventsList";
import FloatButtonsGroup from "./FloatButtonsGroup/FloatButtonsGroup";
import "./HomePage.scss";

export const HomePage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [isButtonsGroupOpened, SetButtonsGroupOpened] = useState(false);

  const preparedParams = getParams(params);
  return (
    <div>
      <button
        onClick={() => {
          //TODO переместить logout в страницу профиля. Просто тестовый, если CI/CD настроится раньше выкатки профиля
          void logout().then(() => {
            tokenStorage.clearTokens();
            settingsStorage.clearRememberMe();
            void navigate("/auth");
          });
        }}
      >
        Выйти
      </button>
      <EventsList filters={preparedParams} />
      <FloatButtonsGroup
        setOpen={SetButtonsGroupOpened}
        open={isButtonsGroupOpened}
      />
    </div>
  );
};
