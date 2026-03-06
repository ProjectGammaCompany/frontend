import {
  CustomIcon,
  HomeSvg,
  NotificationSvg,
  ProfileSvg,
} from "@/src/shared/ui";

import type { ReactNode } from "react";

export interface NavigationButtonsInfo {
  pathname: "/" | "/notifications" | "/profile";
  icon: ReactNode;
  onClick?: () => void;
}

export const NAVIGATION_BUTTONS_INFO: NavigationButtonsInfo[] = [
  {
    pathname: "/notifications",
    icon: <CustomIcon component={NotificationSvg} />,
  },
  {
    pathname: "/",
    icon: <CustomIcon component={HomeSvg} />,
  },
  {
    pathname: "/profile",
    icon: <CustomIcon component={ProfileSvg} />,
  },
];
