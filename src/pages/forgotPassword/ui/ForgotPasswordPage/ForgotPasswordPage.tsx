import {
  useChangePassword,
  useRecoverCodeValidity,
  useSendCodeByEmail,
} from "@/entities/User";
import { handleError } from "@/shared/api";
import { Seo, settingsStorage, tokenStorage, useNotify } from "@/shared/lib";
import { Button, Flex, Form, Input, Typography } from "antd";
import Password from "antd/es/input/Password";
import { useEffect, useEffectEvent, useState } from "react";
import { useNavigate } from "react-router";
import "./ForgotPasswordPage.scss";
interface EmailFormData {
  email: string;
}

interface CodeFormData {
  code: string;
}

interface ChangePasswordFormData {
  password: string;
  repeatPassword: string;
}
const ForgotPasswordPage = () => {
  const notify = useNotify();
  const navigate = useNavigate();

  const [email, setEmail] = useState<null | string>(null);

  const [code, setCode] = useState<null | string>(null);

  const [codeValidity, setCodeValidity] = useState(false);

  const handleSuccessSendCode = (email: string) => {
    setEmail(email);
    notify.success({
      title: "Письмо с кодом отправлено",
      description:
        "Проверьте указанную почту и введите код, указанный в письме",
    });
  };

  const handleErrorSendCode = (error: Error) => {
    return handleError(error, {
      defaultHandler: () =>
        notify.error({
          title: "Не удалось отправить письмо с кодом",
          description: "Произошла ошибка. Повторите попытку позже",
        }),
      axiosHandlers: {
        404: () =>
          notify.error({
            title: "Несуществующий пользователь",
            description:
              "Пользователя, зарегистрированного по указанной почте не найден",
          }),
      },
    });
  };

  const sendCodeByEmailMutation = useSendCodeByEmail(
    handleSuccessSendCode,
    handleErrorSendCode,
  );

  const { data, isPending, error, refetch, isRefetching } =
    useRecoverCodeValidity(code, !!code);

  const handleChangePasswordSuccess = (
    accessToken: string,
    refreshToken: string,
  ) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    settingsStorage.setRememberMe();
    void navigate("/home");
  };

  const handleChangePasswordError = () => {
    notify.error({
      title: "Не удалось изменить пароль",
      description:
        "Произошла ошибка. Повторите попытку или повторите процедуру занова",
    });
  };

  const changePasswordMutation = useChangePassword(
    handleChangePasswordSuccess,
    handleChangePasswordError,
  );

  const handleEmailFormSubmit = (email: string) => {
    sendCodeByEmailMutation.mutate(email);
  };

  const handleCodeFormSubmit = (code: string) => {
    setCode(code);
  };

  const handleCodeError = useEffectEvent((error: Error) => {
    handleError(error, {
      defaultHandler: () =>
        notify.error({
          title: "Не удалось проверить код",
          description: "Произошла ошибка.Повторите попытку позже",
        }),
      axiosHandlers: {
        403: () =>
          notify.error({
            title: "Некорректный код",
            description:
              "Введён несуществующий код. Введите код повторно или повторите процедуру",
          }),
      },
    });
  });

  const handleChangePasswordFormSubmit = (values: ChangePasswordFormData) => {
    changePasswordMutation.mutate({
      code: code!,
      password: values.password,
      repeatPassword: values.repeatPassword,
    });
  };

  useEffect(() => {
    if (error) {
      handleCodeError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (data?.validity && !isRefetching) {
      setCodeValidity(data.validity);
    }
  }, [data, isRefetching]);

  useEffect(() => {
    const el = document.getElementById("root-layout");

    if (el) {
      el.classList.toggle("root-layout_on-forgot-password-page");
    }

    return () => {
      if (el) {
        el.classList.toggle("root-layout_on-forgot-password-page");
      }
    };
  }, []);

  useEffect(() => {
    console.log(isRefetching, isPending, code);
  }, [code, isPending, isRefetching]);

  useEffect(() => {
    if (code) {
      void refetch();
    }
  }, [code, refetch]);

  return (
    <div className="forgot-password-page">
      <Seo
        title="Восстановление пароля"
        description="Страница восстановления пароля."
        canonical="forgot-password"
        noIndex
      />
      <div className="forgot-password-page__content-wrapper">
        <Typography.Title level={1} className="forgot-password-page__title">
          Сброс пароля
        </Typography.Title>
        {email && codeValidity ? (
          <Form<ChangePasswordFormData>
            requiredMark={false}
            layout="vertical"
            className="forgot-password-page__form"
            onFinish={handleChangePasswordFormSubmit}
          >
            <Form.Item<ChangePasswordFormData>
              name="password"
              label="Введите новый пароль"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Password />
            </Form.Item>
            <Form.Item<ChangePasswordFormData>
              name="repeatPassword"
              label="Повторите введённый пароль"
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                }),
              ]}
            >
              <Password />
            </Form.Item>
            <Flex justify="space-around" gap={15}>
              <Button
                onClick={() => {
                  setCodeValidity(false);
                  setCode(null);
                }}
              >
                Назад
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={changePasswordMutation.isPending}
                className="forgot-password-page__submit-btn"
              >
                Обновить пароль
              </Button>
            </Flex>
          </Form>
        ) : email ? (
          <Form<CodeFormData>
            onFinish={({ code }) => handleCodeFormSubmit(code)}
            layout="vertical"
          >
            <Form.Item<CodeFormData>
              name="code"
              label="Введите код"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Flex justify="space-around" gap={15}>
              <Button
                onClick={() => {
                  setEmail(null);
                }}
              >
                Назад
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isRefetching || (isPending && !!code)}
                className="forgot-password-page__submit-btn"
              >
                Далее
              </Button>
            </Flex>
          </Form>
        ) : (
          <Form<EmailFormData>
            layout="vertical"
            requiredMark={false}
            onFinish={({ email }) => handleEmailFormSubmit(email)}
          >
            <Form.Item<EmailFormData>
              label="Введите почту, на которую зарегистрирован аккаунт"
              key="email"
              name="email"
              rules={[
                {
                  required: true,
                },
                {
                  type: "email",
                  message: "Введите корректную почту",
                },
              ]}
            >
              <Input type="email" inputMode="email" />
            </Form.Item>
            <Flex justify="space-between" gap={15}>
              <Button
                onClick={() => {
                  void navigate("/auth");
                }}
              >
                Вернуться
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={sendCodeByEmailMutation.isPending}
                className="forgot-password-page__submit-btn"
              >
                {!sendCodeByEmailMutation.isPending && "Получить код"}
              </Button>
            </Flex>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
