import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useLogout } from "../../model/useLogout";
import "./LogoutBtn.scss";
const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleSuccessLogout = () => {
    tokenStorage.clearTokens();
    settingsStorage.clearRememberMe();
    void navigate("/auth");
  };

  const logoutMutation = useLogout(handleSuccessLogout);

  const handleClick = () => {
    logoutMutation.mutate();
  };

  return (
    <Button onClick={handleClick} className="profile-page__logout-btn">
      Выйти
    </Button>
  );
};

export default LogoutBtn;
