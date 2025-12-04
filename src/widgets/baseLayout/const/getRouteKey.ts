export type HeaderRoute = "home";
export const getRouteKey = (pathname: string): HeaderRoute | null => {
  switch (pathname) {
    case "/":
      return "home";
    default:
      return null;
  }
};
