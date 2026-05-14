import {
  useJoinEvent,
  useJoinRequiredFields,
  type JoinDetails,
  type UseJoinEventResponse,
} from "@/entities/Event";
import { handleError } from "@/shared/api/axios";
import { CustomModalWindow } from "@/shared/ui/CustomModalWindow";
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

  const {
    data: requiredFields,
    error: requiredFieldsError,
    isFetching,
    refetch,
  } = useJoinRequiredFields(joinCode, false);

  const [form] = useForm<JoinForm>();

  const handleJoinEventSuccess = (response: UseJoinEventResponse) => {
    void navigate(`/event/${response.data.eventId}`);
  };

  const handleJoinEventError = (error: Error) => {
    return handleError<void>(error, {
      defaultHandler: () =>
        setErrorMessage("Произошла ошибка. Повторите попытку"),
      axiosHandlers: {
        403: () => setErrorMessage("Введены некорректные данные"),
      },
    });
  };

  const joinEventMutation = useJoinEvent(
    joinCode,
    handleJoinEventSuccess,
    handleJoinEventError,
  );

  const handleAfterClose = () => {
    setJoinCode("");
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
                {handleError<string>(requiredFieldsError, {
                  axiosHandlers: {
                    403: () => {
                      return "Некорректный код";
                    },
                  },
                  defaultHandler: () => "Произошла ошибка. Повторите попытку",
                })}
              </Typography.Paragraph>
            )}
            <Button
              className="join-with-code-window__submit-btn"
              disabled={!joinCode}
              loading={isFetching}
              onClick={() => {
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
