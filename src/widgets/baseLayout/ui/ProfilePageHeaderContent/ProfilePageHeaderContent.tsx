import { Logo } from "@/shared/ui/Logo";
import { Typography } from "antd";
import { useLocation } from "react-router";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import "./ProfilePageHeaderContent.scss";

const ProfilePageHeaderContent = () => {
  const { pathname } = useLocation();
  return (
    <div className="profile-page-header-content">
      <Logo className="profile-page-header-content__logo" />
      <Typography.Title level={1} className="profile-page-header-content__text">
        Профиль
      </Typography.Title>
      <div className="profile-page-header-content__buttons-wrapper">
        <NavigationButtons pathname={pathname} />
      </div>
    </div>
  );
};

export default ProfilePageHeaderContent;
