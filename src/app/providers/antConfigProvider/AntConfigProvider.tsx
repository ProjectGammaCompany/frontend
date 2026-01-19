import { ConfigProvider } from "antd";
import locale from "antd/es/locale/ru_RU";
import { default as dayjs } from "dayjs";
import "dayjs/locale/ru";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import type { ReactNode } from "react";

import customParseFormat from "dayjs/plugin/customParseFormat";

interface AntConfigProviderProps {
  children: ReactNode;
}

const validateMessages = {
  required: "Поле обязательно",
};

dayjs.extend(updateLocale);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

dayjs.updateLocale("ru", {
  weekStart: 1,
});

const AntConfigProvider = ({ children }: AntConfigProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        cssVar: {
          key: "app",
        },
        components: {
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
          },
        },
        token: {
          colorPrimary: "#5c30ff",
          colorInfo: "#5c30ff",
          colorSuccess: "#b8ce52",
          colorError: "#e63c25",
          colorLink: "#2f54eb",
          colorWarning: "#f6bc3f",
          fontSizeHeading1: 20,
          fontSizeHeading2: 17,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 15,
          borderRadius: 5,
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
