import "@ant-design/v5-patch-for-react-19";
import { RouterProvider } from "react-router";
import AntConfigProvider from "./providers/antConfigProvider/AntConfigProvider";
import { NotificationProvider } from "./providers/notificationProvider/notificationProvider";
import router from "./providers/routerProvider/router";
import { useClearTokens } from "./providers/useClearTokensOnClose";
import "./styles/App.scss";

//todo: В запросах на union сделать проверки ответа от сервера в будущем
function App() {
  useClearTokens();

  return (
    <AntConfigProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AntConfigProvider>
  );
}

export default App;
