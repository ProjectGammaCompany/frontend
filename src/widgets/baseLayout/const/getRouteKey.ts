export type HeaderRoute = "home" | "profile";
export const getRouteKey = (pathname: string): HeaderRoute | null => {
  switch (pathname) {
    case "/":
      return "home";
    case "/profile":
      return "profile";
    default:
      return null;
  }
};
