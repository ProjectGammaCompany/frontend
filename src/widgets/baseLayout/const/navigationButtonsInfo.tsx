import { CustomIcon, HomeSvg, NotificationSvg, ProfileSvg } from "@/shared/ui";

import type { ReactNode } from "react";

export interface NavigationButtonsInfo {
  pathname: "/home" | "/notifications" | "/profile";
  icon: ReactNode;
  onClick?: () => void;
}

export const NAVIGATION_BUTTONS_INFO: NavigationButtonsInfo[] = [
  {
    pathname: "/notifications",
    icon: <CustomIcon component={NotificationSvg} />,
  },
  {
    pathname: "/home",
    icon: <CustomIcon component={HomeSvg} />,
  },
  {
    pathname: "/profile",
    icon: <CustomIcon component={ProfileSvg} />,
  },
];
