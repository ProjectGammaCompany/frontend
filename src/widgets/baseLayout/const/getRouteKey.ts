export type HeaderRoute = "home" | "profile" | "notifications" | "myEvents";
export const getRouteKey = (pathname: string): HeaderRoute | null => {
  switch (pathname) {
    case "/":
      return "home";
    case "/profile":
      return "profile";
    case "/notifications":
      return "notifications";
    case "/myEvents":
      return "myEvents";
    default:
      return null;
  }
};
