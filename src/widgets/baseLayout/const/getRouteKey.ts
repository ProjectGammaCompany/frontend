export type HeaderRoute = "home" | "profile" | "notifications";
export const getRouteKey = (pathname: string): HeaderRoute | null => {
  switch (pathname) {
    case "/":
      return "home";
    case "/profile":
      return "profile";
    case "/notifications":
      return "notifications";
    default:
      return null;
  }
};
