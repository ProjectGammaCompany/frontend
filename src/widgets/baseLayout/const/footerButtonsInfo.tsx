import {
  CustomIcon,
  HomeSvg,
  NotificationSvg,
  ProfileSvg,
} from "@/src/shared/ui";

import type { ReactNode } from "react";

export interface footerButtonsInfo {
  pathname: "/" | "/notifications" | "/profile";
  icon: ReactNode;
  onClick?: () => void;
}

export const FOOTER_BUTTONS_INFO: footerButtonsInfo[] = [
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
