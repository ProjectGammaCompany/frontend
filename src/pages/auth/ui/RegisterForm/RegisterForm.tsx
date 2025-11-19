import { settingsStorage, tokenStorage } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { register, type registerProps } from "../../api/register";
import { EMAIL_RULES, PASSWORD_RULES } from "../../const/rules";
import AuthForm from "../AuthForm/AuthForm";

const RegisterForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
      settingsStorage.setRememberMe();
      void navigate("/");
    },
  });
  return (
    <AuthForm<registerProps>
      name="register"
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
        {
          name: "repeatPassword",
          type: "password",
          label: "Повторный ввод пароля",
          dependencies: ["password"],
          rules: [
            ...PASSWORD_RULES,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ],
        },
      ]}
      submitButtonText="Зарегистрироваться"
      onFinish={(values) => mutation.mutate(values)}
      loading={mutation.isPending}
      error={mutation.error ? "Произошла ошибка" : undefined}
    />
  );
};

export default RegisterForm;
