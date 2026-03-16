import { errorText } from "@/src/shared/api";
import { Flex, Spin, Typography } from "antd";
import { useProfileData } from "../../model/useProfileData";
import AvatarBlock from "../AvatarBlock/AvatarBlock";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import "./ProfilePage.scss";

const ProfilePage = () => {
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
          {errorText(
            error,
            () => undefined,
            () => undefined,
            undefined,
            "Произошла ошибка. Перезагрузите страницу.",
            "Произошла ошибка. Перезагрузите страницу.",
            "Произошла ошибка. Перезагрузите страницу.",
          )}
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
