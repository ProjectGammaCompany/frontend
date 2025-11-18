import { AuthPage } from "@/src/pages/auth";
import { HomePage } from "@/src/pages/home";
import { tokenStorage } from "@/src/shared/lib";
import { createBrowserRouter, redirect } from "react-router";
import { RootLayout } from "./NavigationRegister";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
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
