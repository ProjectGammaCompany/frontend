import { AuthPage } from "@/pages/auth";
import { EventPage } from "@/pages/event";
import { ForgotPasswordPage } from "@/pages/forgotPassword";
import { GamePage } from "@/pages/game";
import { HomePage } from "@/pages/home";
import { MyEventsPage } from "@/pages/myEvents";
import { NotificationPage } from "@/pages/notifications";
import { ProfilePage } from "@/pages/profile";
import { StatsPage } from "@/pages/stats";
import { tokenStorage } from "@/shared/lib";
import { BaseLayout } from "@/widgets";
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
        path: "/forgot-password",
        middleware: [authMiddleware],
        Component: ForgotPasswordPage,
      },
      {
        path: "/",
        middleware: [privateRoutesMiddleware],
        children: [
          {
            path: "event/:eventId",
            children: [
              {
                path: "game",
                Component: GamePage,
              },
              {
                path: "stats",
                Component: StatsPage,
              },
              {
                index: true,
                Component: EventPage,
              },
            ],
          },
          {
            path: "/",
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
                  {
                    path: "my-events",
                    Component: MyEventsPage,
                  },
                ],
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
