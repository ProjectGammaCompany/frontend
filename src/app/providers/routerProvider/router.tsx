import { AuthPage } from "@/pages/auth";
import { ErrorPage } from "@/pages/error";
import { EventPage } from "@/pages/event";
import { ForgotPasswordPage } from "@/pages/forgotPassword";
import { GamePage } from "@/pages/game";
import { HomePage } from "@/pages/home";
import { LandingPage } from "@/pages/landing";
import { MyEventsPage } from "@/pages/myEvents";
import { NotificationPage } from "@/pages/notifications";
import { PolicyPage } from "@/pages/policy";
import { ProfilePage } from "@/pages/profile";
import { StatsPage } from "@/pages/stats";
import { TermsPage } from "@/pages/terms";
import { tokenStorage } from "@/shared/lib/tokenStorage";
import { BaseLayout } from "@/widgets/baseLayout";
import { createBrowserRouter, redirect } from "react-router";
import { RootLayout } from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: RootLayout,
        children: [
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
                        path: "home",
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
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "/policy",
        Component: PolicyPage,
      },
      {
        path: "/terms",
        Component: TermsPage,
      },
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
    ],
  },
]);

function privateRoutesMiddleware() {
  if (!tokenStorage.getAccessToken()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/auth");
  }
}

function authMiddleware() {
  if (tokenStorage.getAccessToken()) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/home");
  }
}

export default router;
