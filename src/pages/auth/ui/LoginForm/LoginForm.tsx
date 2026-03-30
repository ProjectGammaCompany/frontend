import { handleError } from "@/src/shared/api";
import { Flex, Switch, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { type loginProps } from "../../api/login";
import { EMAIL_RULES, PASSWORD_RULES } from "../../const/rules";
import { useLogin } from "../../model/useLogin";
import AuthForm from "../AuthForm/AuthForm";
import "./LoginForm.scss";
const LoginForm = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleSuccessLogin = () => {
    void navigate("/");
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginError = (error: Error) => {
    return handleError<void>(error, {
      axiosHandlers: {
        403: () =>
          setErrorMessage("Пользователя с указанными данными не существует"),
      },
      defaultHandler: () =>
        setErrorMessage("Произошла ошибка. Повторите попытку позже."),
    });
  };

  const loginMutation = useLogin(
    rememberMe,
    handleSuccessLogin,
    handleLoginError,
  );

  return (
    <AuthForm<loginProps>
      name="login"
      fields={[
        {
          name: "email",
          label: "Почта",
          type: "email",
          inputMode: "email",
          rules: EMAIL_RULES,
        },
        {
          name: "password",
          label: "Пароль",
          type: "password",
          rules: PASSWORD_RULES,
        },
      ]}
      onFinish={(values) => loginMutation.mutate(values)}
      extra={
        <div className="login-form__extra">
          <div className="login-form__remember-me-wrapper">
            <Switch
              value={rememberMe}
              onChange={() => setRememberMe((prevState) => !prevState)}
              disabled={loginMutation.isPending}
            />
            <Typography>Запомнить меня</Typography>
          </div>
          <Flex justify="end">
            <Link
              to="/forgot-password"
              className="login-form__forgot-password-text"
            >
              <Typography.Link>Забыли пароль?</Typography.Link>
            </Link>
          </Flex>
        </div>
      }
      submitButtonText="Войти"
      loading={loginMutation.isPending}
      error={loginMutation.error ? errorMessage : undefined}
    />
  );
};

export default LoginForm;
