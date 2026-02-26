import {
  useJoinEvent,
  useJoinRequiredFields,
  type JoinDetails,
  type UseJoinEventResponse,
} from "@/src/entities";
import { CustomModalWindow } from "@/src/shared/ui";
import { Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Password from "antd/es/input/Password";
import { useState } from "react";
import { useNavigate } from "react-router";

interface JoinWithCodeWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

type JoinForm = JoinDetails;

const JoinWithCodeWindow = ({ open, setIsOpen }: JoinWithCodeWindowProps) => {
  const navigate = useNavigate();

  const [joinCode, setJoinCode] = useState<string>("");

  const [usedJoinCode, setUsedJoinCode] = useState("");

  const { data: requiredFields } = useJoinRequiredFields(
    usedJoinCode,
    !!usedJoinCode,
  );

  const [form] = useForm<JoinForm>();

  const handleSuccessJoin = (response: UseJoinEventResponse) => {
    void navigate(`event/${response.data.eventId}`);
  };

  const joinEventMutation = useJoinEvent(usedJoinCode, handleSuccessJoin);

  const handleAfterClose = () => {
    setJoinCode("");
    setUsedJoinCode("");
    form.resetFields();
  };

  const handleFinish = (values: JoinForm) => {
    joinEventMutation.mutate(values);
  };

  return (
    <CustomModalWindow
      open={open}
      setIsOpen={setIsOpen}
      afterClose={handleAfterClose}
    >
      {requiredFields ? (
        <Form
          form={form}
          requiredMark={false}
          scrollToFirstError={{
            behavior: "instant",
            block: "end",
            focus: true,
          }}
          onFinish={handleFinish}
        >
          <Form.Item<JoinForm>
            name="eventPassword"
            label="Пароль события"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Password />
          </Form.Item>
          {requiredFields.groupFields && (
            <div>
              <Typography.Title level={2}>Данные группы</Typography.Title>
              <Form.Item<JoinForm>
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
              <Form.Item<JoinForm>
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
            </div>
          )}
          <Form.Item>
            <Button htmlType="submit" loading={joinEventMutation.isPending}>
              Присоединиться
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <Typography.Paragraph>
            Введите пригласительный код
          </Typography.Paragraph>
          <Input
            placeholder="Код"
            value={joinCode}
            onChange={(e) => setJoinCode(e.currentTarget.value)}
          />
          <Button
            disabled={!joinCode}
            onClick={() => setUsedJoinCode(joinCode)}
          >
            Присоединиться
          </Button>
        </div>
      )}
    </CustomModalWindow>
  );
};

export default JoinWithCodeWindow;
