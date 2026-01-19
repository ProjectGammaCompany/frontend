import { Header } from "@/src/shared/ui";
import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router";

import { getRouteKey, type HeaderRoute } from "../../const/getRouteKey";
import Footer from "../Footer/Footer";
import MainPageHeaderContent from "../MainPageHeaderContent/MainPageHeader";
import NotificationPageHeaderContent from "../NotificationPageHeaderContent/NotificationPageHeaderContent";
import ProfilePageHeaderContent from "../ProfilePageHeaderContent/ProfilePageHeaderContent";
import "./BaseLayout.scss";

const BaseLayout = () => {
  const { pathname } = useLocation();

  const headerContent: Record<HeaderRoute, ReactNode> = {
    home: <MainPageHeaderContent />,
    profile: <ProfilePageHeaderContent />,
    notifications: <NotificationPageHeaderContent />,
  };

  const key = getRouteKey(pathname);
  return (
    <>
      <Header children={key ? headerContent[key] : null} />
      <main className="base-layout__main">
        <Outlet />
      </main>
      <Footer pathname={pathname} />
    </>
  );
};

export default BaseLayout;
