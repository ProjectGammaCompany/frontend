import "@ant-design/v5-patch-for-react-19";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { queryClient } from "../shared/api";
import AntConfigProvider from "./providers/antConfigProvider/AntConfigProvider";
import { MessageProvider } from "./providers/messageProvider/messageProvider";
import { NotificationProvider } from "./providers/notificationProvider/notificationProvider";
import router from "./providers/routerProvider/router";
import { useClearTokens } from "./providers/useClearTokensOnClose";
import "./styles/App.scss";

//todo: добавить отправку lastEditionDate в каждый put/post/delete запрос в editor'е
function App() {
  useClearTokens();

  return (
    <QueryClientProvider client={queryClient}>
      <AntConfigProvider>
        <NotificationProvider>
          <MessageProvider>
            <RouterProvider router={router} />
          </MessageProvider>
        </NotificationProvider>
      </AntConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
