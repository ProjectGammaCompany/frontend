import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { Switch, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login, type loginProps } from "../../api/login";
import { EMAIL_RULES, PASSWORD_RULES } from "../../const/rules";
import AuthForm from "../AuthForm/AuthForm";

const LoginForm = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      if (rememberMe) {
        settingsStorage.setRememberMe();
      }
      void navigate("/");
    },
  });

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
      onFinish={(values) => mutation.mutate(values)}
      extra={
        <div>
          <div>
            <Typography>Запомнить меня</Typography>
            <Switch
              value={rememberMe}
              onChange={() => setRememberMe((prevState) => !prevState)}
              disabled={mutation.isPending}
            />
          </div>
          <Typography>Забыли пароль?</Typography>
        </div>
      }
      submitButtonText="Войти"
      loading={mutation.isPending}
      error={mutation.error ? "Произошла ошибка" : undefined}
    />
  );
};

export default LoginForm;
