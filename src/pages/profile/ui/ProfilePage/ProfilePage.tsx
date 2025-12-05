import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { getProfile } from "../../api/getProfile";
import AvatarBlock from "../AvatarBlock/AvatarBlock";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    select: (data) => data.data,
  });

  if (isPending) {
    return <div>Загрузка</div>;
  }

  if (isError) {
    return <div>Ошибка</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-page__main-info-block">
        <Typography.Title>{data.username}</Typography.Title>
        <AvatarBlock avatar={data.avatar} />
      </div>
      <LogoutBtn />
    </div>
  );
};

export default ProfilePage;
