import {
  useJoinEvent,
  useJoinRequiredFields,
  type JoinDetails,
  type UseJoinEventResponse,
} from "@/src/entities";
import { errorText } from "@/src/shared/api";
import { CustomModalWindow } from "@/src/shared/ui";
import { Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import Password from "antd/es/input/Password";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./JoinWithCodeWindow.scss";
interface JoinWithCodeWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

type JoinForm = JoinDetails;

const JoinWithCodeWindow = ({ open, setIsOpen }: JoinWithCodeWindowProps) => {
  const navigate = useNavigate();

  const [joinCode, setJoinCode] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState("");

  const [usedJoinCode, setUsedJoinCode] = useState("");

  const {
    data: requiredFields,
    error: requiredFieldsError,
    isPending,
    refetch,
  } = useJoinRequiredFields(usedJoinCode, !!usedJoinCode);

  const [form] = useForm<JoinForm>();

  const handleSuccessJoin = (response: UseJoinEventResponse) => {
    void navigate(`event/${response.data.eventId}`);
  };

  const joinEventMutation = useJoinEvent(
    usedJoinCode,
    handleSuccessJoin,
    () => setErrorMessage("Введены некорректные данные"),
    () => setErrorMessage("Произошла ошибка. Повторите попытку"),
  );

  const handleAfterClose = () => {
    setJoinCode("");
    setUsedJoinCode("");
    setErrorMessage("");
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
          layout="vertical"
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
          <Form.Item className="join-with-code-window__btn-wrapper">
            {errorMessage && (
              <Typography.Paragraph type="danger">
                {errorMessage}
              </Typography.Paragraph>
            )}
            <Button
              htmlType="submit"
              loading={joinEventMutation.isPending}
              className="join-with-code-window__submit-btn"
            >
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
          <div className="join-with-code-window__btn-wrapper">
            {requiredFieldsError && (
              <Typography.Paragraph type="danger">
                {errorText(
                  requiredFieldsError,
                  () => undefined,
                  () => undefined,
                  undefined,
                  "Некорректный код",
                  undefined,
                  "Произошла ошибка. Повторите попытку",
                )}
              </Typography.Paragraph>
            )}
            <Button
              className="join-with-code-window__submit-btn"
              disabled={!joinCode}
              loading={isPending && !!usedJoinCode}
              onClick={() => {
                setUsedJoinCode(joinCode);
                void refetch();
              }}
            >
              Присоединиться
            </Button>
          </div>
        </div>
      )}
    </CustomModalWindow>
  );
};

export default JoinWithCodeWindow;
