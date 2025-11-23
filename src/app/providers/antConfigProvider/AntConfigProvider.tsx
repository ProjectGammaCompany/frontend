import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

interface AntConfigProviderProps {
  children: ReactNode;
}

const validateMessages = {
  required: "Поле обязательно",
};

const AntConfigProvider = ({ children }: AntConfigProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        components: {
          Button: {},
        },
      }}
      form={{
        validateMessages,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntConfigProvider;
