import { handleError } from "@/shared/api/axios";
import { CustomSwitch } from "@/shared/ui/CustomSwitch";
import { Form, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { type RegisterProps } from "../../api/register";
import { EMAIL_RULES, PASSWORD_RULES } from "../../const/rules";
import { useRegister } from "../../model/useRegister";
import AuthForm from "../AuthForm/AuthForm";
import "./RegisterForm.scss";

type RegisterFormValues = RegisterProps & {
  agreement: boolean;
};

interface RegisterFormProps {
  setHeightForm: (height: number) => void;
}
const RegisterForm = ({ setHeightForm }: RegisterFormProps) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccessRegister = () => {
    void navigate("/home");
  };

  const handleRegisterError = (error: Error) => {
    return handleError<void>(error, {
      defaultHandler: () =>
        setErrorMessage("Произошла ошибка. Повторите попытку позже"),
      axiosHandlers: {
        403: () =>
          setErrorMessage("Пользователь с указанной почтой уже существует"),
      },
    });
  };

  const registerMutation = useRegister(
    handleSuccessRegister,
    handleRegisterError,
  );
  return (
    <AuthForm<RegisterFormValues>
      name="register"
      setHeightForm={setHeightForm}
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
      extra={
        <Form.Item
          rules={[
            { required: true },
            {
              validator(_, value) {
                if (typeof value === "boolean" && !value) {
                  return Promise.reject(new Error("Поле обязательно"));
                }
                return Promise.resolve();
              },
            },
          ]}
          className="register-form__agreement-item"
          name="agreement"
        >
          <CustomSwitch
            titleNode={
              <Typography.Text className="register-form__agreement-text">
                Я принимаю условия{" "}
                <Link to="/terms">Пользовательского соглашения</Link> и даю
                согласие на обработку персональных данных в соответствии с{" "}
                <Link to="/policy">Политикой конфиденциальности</Link>
              </Typography.Text>
            }
          />
        </Form.Item>
      }
      submitButtonText="Зарегистрироваться"
      onFinish={(values) => registerMutation.mutate(values)}
      loading={registerMutation.isPending}
      error={registerMutation.isError ? errorMessage : undefined}
    />
  );
};

export default RegisterForm;
