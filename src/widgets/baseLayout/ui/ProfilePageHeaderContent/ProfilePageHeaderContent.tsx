import { Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import "./ProfilePageHeaderContent.scss";

const ProfilePageHeaderContent = () => {
  return (
    <div className="profile-page-header-content">
      <Logo />
      <Typography.Title level={1} className="profile-page-header-content__text">
        Профиль
      </Typography.Title>
    </div>
  );
};

export default ProfilePageHeaderContent;
