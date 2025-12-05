import { Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import "./ProfilePageHeaderContent.scss";

const ProfilePageHeaderContent = () => {
  return (
    <div className="profile-page-header-content">
      <Logo />
      <Typography.Title level={2}>Профиль</Typography.Title>
    </div>
  );
};

export default ProfilePageHeaderContent;
