import { CustomModalWindow } from "@/src/shared/ui";
import { Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { useJoinGroup } from "../../model/useJoinGroup";

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
  const joinGroupMutation = useJoinGroup(eventId, onSuccess);

  const handleFinish = (values: FormData) => {
    joinGroupMutation.mutate(values);
  };
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <Form<FormData> onFinish={handleFinish}>
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
        <Form.Item>
          <Button htmlType="submit" loading={joinGroupMutation.isPending}>
            Присоединиться
          </Button>
        </Form.Item>
      </Form>
    </CustomModalWindow>
  );
};

export default JoinGroupWindow;
