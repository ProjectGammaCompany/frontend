import { RouterProvider } from "react-router";
import router from "./providers/routerProvider/router";
import "./styles/App.scss";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
