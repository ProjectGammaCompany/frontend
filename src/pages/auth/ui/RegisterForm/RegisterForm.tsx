import { useState } from "react";
import { useNavigate } from "react-router";
import { type registerProps } from "../../api/register";
import { EMAIL_RULES, PASSWORD_RULES } from "../../const/rules";
import { useRegister } from "../../model/useRegister";
import AuthForm from "../AuthForm/AuthForm";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccessRegister = () => {
    void navigate("/");
  };

  const registerMutation = useRegister(
    handleSuccessRegister,
    () => setErrorMessage("Пользователь с указанной почтой уже существует"),
    () => setErrorMessage("Произошла ошибка. Повторите попытку позже."),
  );
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
      onFinish={(values) => registerMutation.mutate(values)}
      loading={registerMutation.isPending}
      error={registerMutation.isError ? errorMessage : undefined}
    />
  );
};

export default RegisterForm;
