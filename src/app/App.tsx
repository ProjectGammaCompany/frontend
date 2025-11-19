import "@ant-design/v5-patch-for-react-19";
import { RouterProvider } from "react-router";
import AntConfigProvider from "./providers/antConfigProvider/AntConfigProvider";
import router from "./providers/routerProvider/router";
import { useClearTokens } from "./providers/useClearTokensOnClose";
import "./styles/App.scss";
function App() {
  useClearTokens();
  return (
    <AntConfigProvider>
      <RouterProvider router={router} />;
    </AntConfigProvider>
  );
}

export default App;
