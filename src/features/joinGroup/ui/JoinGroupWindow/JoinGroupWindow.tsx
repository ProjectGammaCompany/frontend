import { CustomModalWindow } from "@/src/shared/ui";
import { Button, Form, Input, Typography } from "antd";
import Password from "antd/es/input/Password";
import { useState } from "react";
import { useJoinGroup } from "../../model/useJoinGroup";
import "./JoinGroupWindow.scss";
interface JoinGroupWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  eventId: string;
  onSuccess: () => void;
}

interface FormData {
  groupName: string;
  groupPassword: string;
}

const JoinGroupWindow = ({
  open,
  setIsOpen,
  eventId,
  onSuccess,
}: JoinGroupWindowProps) => {
  const [errorText, setErrorText] = useState("");

  const handleForbidden = () => {
    setErrorText("Группы с введёнными данными не существует");
  };

  const handleError = () => {
    setErrorText("Произошла ошибка. Повторите попытку позже");
  };
  const joinGroupMutation = useJoinGroup(
    eventId,
    onSuccess,
    handleForbidden,
    handleError,
  );
  const handleFinish = (values: FormData) => {
    setErrorText("");
    joinGroupMutation.mutate(values);
  };

  return (
    <CustomModalWindow
      open={open}
      setIsOpen={setIsOpen}
      afterClose={() => {
        setErrorText("");
      }}
    >
      <Form<FormData> onFinish={handleFinish} layout="vertical">
        <Form.Item<FormData>
          name="groupName"
          label="Название группы"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FormData>
          name="groupPassword"
          label="Пароль группы"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Password />
        </Form.Item>
        <Form.Item noStyle>
          {joinGroupMutation.isError && errorText && (
            <Typography.Paragraph
              type="danger"
              className="join-group-window__error-text"
            >
              {errorText}
            </Typography.Paragraph>
          )}
        </Form.Item>
        <Form.Item className="join-group-window__submit-btn-wrapper">
          <Button htmlType="submit" loading={joinGroupMutation.isPending}>
            Присоединиться
          </Button>
        </Form.Item>
      </Form>
    </CustomModalWindow>
  );
};

export default JoinGroupWindow;
