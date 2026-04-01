import { useUpdateUsername } from "@/src/entities";
import { handleError } from "@/src/shared/api";
import { useNotify } from "@/src/shared/lib";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useEffectEvent } from "react";
import { useProfileData } from "../../model/useProfileData";
import AvatarBlock from "../AvatarBlock/AvatarBlock";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import "./ProfilePage.scss";

interface ProfileFormData {
  username: string;
}
const ProfilePage = () => {
  const notify = useNotify();

  const { data, isError, isPending, error } = useProfileData();

  const [form] = useForm<ProfileFormData>();

  const handleUpdateUsernameSuccess = () => {
    notify.success({
      title: "Имя пользователя обновлено",
      description: "Обновление успешно",
    });
  };

  const handleUpdateUsernameError = () => {
    notify.error({
      title: "Не удалось обновить имя пользователя",
      description: "Произошла ошибка. Повторите попытку позже",
    });
  };

  const updateUsernameMutation = useUpdateUsername(
    handleUpdateUsernameSuccess,
    handleUpdateUsernameError,
  );

  const onData = useEffectEvent((username: string) => {
    form.setFieldValue("username", username);
  });

  useEffect(() => {
    if (data) {
      onData(data.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        <Form<ProfileFormData>
          layout="vertical"
          className="profile-page__form"
          requiredMark={false}
          form={form}
          styles={{
            label: {
              fontWeight: 600,
            },
          }}
          onFinish={(data) => {
            updateUsernameMutation.mutate(data.username);
          }}
        >
          <div>
            <Typography.Text
              style={{
                fontWeight: 600,
              }}
            >
              Почта
            </Typography.Text>
            <Typography.Paragraph>{data.email}</Typography.Paragraph>
          </div>
          <div className="profile-page__username-input-wrapper">
            <Form.Item<ProfileFormData>
              name="username"
              className="profile-page__username-form-item"
              label="Имя пользователя"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="profile-page__update-username-btn"
              loading={updateUsernameMutation.isPending}
            >
              Обновить
            </Button>
          </div>
        </Form>
      </div>
      <LogoutBtn />
    </div>
  );
};

export default ProfilePage;
