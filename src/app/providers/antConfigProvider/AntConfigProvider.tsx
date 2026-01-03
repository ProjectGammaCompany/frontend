import { ConfigProvider } from "antd";
import locale from "antd/es/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
import type { ReactNode } from "react";
interface AntConfigProviderProps {
  children: ReactNode;
}

const validateMessages = {
  required: "Поле обязательно",
};

dayjs.extend(updateLocale);

dayjs.updateLocale("ru", {
  weekStart: 1,
});

const AntConfigProvider = ({ children }: AntConfigProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {},
        },
      }}
      form={{
        validateMessages,
      }}
      locale={locale}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntConfigProvider;
