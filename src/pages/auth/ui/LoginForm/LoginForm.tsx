import { Switch, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
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

  const loginMutation = useLogin(
    rememberMe,
    handleSuccessLogin,
    () => setErrorMessage("Пользователя с указанными данными не существует"),
    () => setErrorMessage("Пользователя с указанными данными не существует"),
    () => setErrorMessage("Произошла ошибка. Повторите попытку позже."),
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
          <Typography className="login-form__forgot-password-text">
            Забыли пароль?
          </Typography>
        </div>
      }
      submitButtonText="Войти"
      loading={loginMutation.isPending}
      error={loginMutation.error ? errorMessage : undefined}
    />
  );
};

export default LoginForm;
