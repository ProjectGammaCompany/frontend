import { Button, Checkbox, Form, Input, Typography } from "antd";
import type { Rule } from "antd/es/form";
import Password from "antd/es/input/Password";
import type { ReactNode } from "react";
import "./AuthForm.scss";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AuthFormProps<T extends Record<string, any>> {
  name: string;
  fields: {
    label?: React.ReactNode;
    name?: string;
    type?: "email" | "password";
    inputMode?: "email";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[] | undefined;
    boolean?: boolean;
    rules?: Rule[] | undefined;
  }[];
  onFinish: (values: T) => void;
  submitButtonText: string;
  loading: boolean;
  error?: string;
  extra?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthForm = <T extends Record<string, any>>({
  name,
  fields,
  onFinish,
  submitButtonText,
  loading,
  error,
  extra,
}: AuthFormProps<T>) => {
  return (
    <Form
      name={name}
      onFinish={onFinish}
      className="auth-form"
      requiredMark={false}
    >
      {fields.map((field) => (
        <Form.Item
          layout="vertical"
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
          dependencies={field.dependencies}
          className="auth-form__form-item"
        >
          {field?.boolean ? (
            <Checkbox />
          ) : field.name?.toLocaleLowerCase().includes("password") ? (
            <Password />
          ) : (
            <Input type={field.type} inputMode={field.inputMode} />
          )}
        </Form.Item>
      ))}
      {extra}
      {error && <Typography>{error}</Typography>}
      <Form.Item label={null}>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="auth-form__submit-btn"
        >
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
