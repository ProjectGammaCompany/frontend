import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { logout } from "../../api/logout";
import "./LogoutBtn.scss";
const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    void logout().then(() => {
      tokenStorage.clearTokens();
      settingsStorage.clearRememberMe();
      void navigate("/auth");
    });
  };

  return (
    <Button onClick={handleClick} className="profile-page__logout-btn">
      Выйти
    </Button>
  );
};

export default LogoutBtn;
