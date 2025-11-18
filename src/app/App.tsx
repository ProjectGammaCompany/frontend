import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";
import router from "./providers/routerProvider/router";
import "./styles/App.scss";
function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
      }}
    >
      <RouterProvider router={router} />;
    </ConfigProvider>
  );
}

export default App;
