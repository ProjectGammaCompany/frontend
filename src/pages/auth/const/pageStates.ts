export const PAGE_STATES = [
  {
    value: "register",
    label: "Регистрация",
  },
  {
    value: "login",
    label: "Вход",
  },
] as const;

export const PAGE_STATES_VALUES = PAGE_STATES.map((state) => state.value);
