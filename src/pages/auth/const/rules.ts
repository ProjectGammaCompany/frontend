import type { Rule } from "antd/es/form";

export const EMAIL_RULES: Rule[] = [
  {
    required: true,
  },
  {
    type: "email",
    message: "Введите корректную почту",
  },
];

export const PASSWORD_RULES: Rule[] = [
  {
    required: true,
  },
  {
    min: 5,
    message: "Длина пароля не менее 5 символов",
  },
];
