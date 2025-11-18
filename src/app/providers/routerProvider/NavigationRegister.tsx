import { globalRouter } from "@/src/shared/lib";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    globalRouter.navigate = navigate;
  }, [navigate]);

  return <Outlet />;
};
