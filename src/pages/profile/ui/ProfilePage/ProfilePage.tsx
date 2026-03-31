import { handleError } from "@/src/shared/api";
import { useTitle } from "@/src/shared/lib";
import { Flex, Spin, Typography } from "antd";
import { useProfileData } from "../../model/useProfileData";
import AvatarBlock from "../AvatarBlock/AvatarBlock";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import "./ProfilePage.scss";

const ProfilePage = () => {
  useTitle("Профиль");
  const { data, isError, isPending, error } = useProfileData();

  if (isPending) {
    return (
      <Flex align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center">
        <Typography.Paragraph type="danger">
          {handleError<string>(error, {
            defaultHandler: () => "Произошла ошибка. Перезагрузите страницу.",
          })}
        </Typography.Paragraph>
      </Flex>
    );
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
