import { AuthPage } from "@/src/pages/auth";
import { HomePage } from "@/src/pages/home";
import { createBrowserRouter, redirect } from "react-router";
import { tokenStorage } from "../../../shared/lib/tokenStorage/tokenStorage";

const router = createBrowserRouter([
  {
    path: "/auth",
    middleware: [authMiddleware],
    Component: AuthPage,
  },
  {
    path: "/",
    middleware: [privateRoutesMiddleware],
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);

//TODO: добавить тест
function privateRoutesMiddleware() {
  if (!tokenStorage.getAccessToken()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/auth");
  }
}

//TODO: добавить тест
function authMiddleware() {
  if (tokenStorage.getAccessToken()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/");
  }
}

export default router;
