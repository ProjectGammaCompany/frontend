import { AuthPage } from "@/src/pages/auth";
import { HomePage } from "@/src/pages/home";
import { ProfilePage } from "@/src/pages/profile";
import { tokenStorage } from "@/src/shared/lib";
import { BaseLayout } from "@/src/widgets";
import { createBrowserRouter, redirect } from "react-router";
import { RootLayout } from "./RootLayout";

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
            path: "/",
            Component: BaseLayout,
            children: [
              {
                index: true,
                Component: HomePage,
              },
              {
                path: "profile",
                Component: ProfilePage,
              },
            ],
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
