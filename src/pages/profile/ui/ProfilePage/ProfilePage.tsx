import { useTitle } from "@/src/shared/lib";
import { Typography } from "antd";
import { useProfileData } from "../../model/useProfileData";
import AvatarBlock from "../AvatarBlock/AvatarBlock";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import "./ProfilePage.scss";

const ProfilePage = () => {
  useTitle("Профиль");
  const { data, isError, isPending } = useProfileData();

  if (isPending) {
    return <div>Загрузка</div>;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-page__main-info-block">
        <AvatarBlock avatar={data.avatar} />
        <Typography.Title level={2} className="profile-page__title">
          {data.username}
        </Typography.Title>
      </div>
      <LogoutBtn />
    </div>
  );
};

export default ProfilePage;
