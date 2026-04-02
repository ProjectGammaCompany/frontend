export type HeaderRoute = "home" | "profile" | "notifications" | "my-events";
export const getRouteKey = (pathname: string): HeaderRoute | null => {
  switch (pathname) {
    case "/":
      return "home";
    case "/profile":
      return "profile";
    case "/notifications":
      return "notifications";
    case "/my-events":
      return "my-events";
    default:
      return null;
  }
};
