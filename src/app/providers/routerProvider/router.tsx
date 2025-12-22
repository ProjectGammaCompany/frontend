import { AuthPage } from "@/src/pages/auth";
import { EventPage } from "@/src/pages/event";
import { HomePage } from "@/src/pages/home";
import { NotificationPage } from "@/src/pages/notifications";
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
        path: "event/:eventId",
        Component: EventPage,
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
              {
                path: "notifications",
                Component: NotificationPage,
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
