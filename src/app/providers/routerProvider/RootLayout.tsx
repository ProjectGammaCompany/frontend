import { globalRouter } from "@/src/shared/lib";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import "./RootLayout.scss";
export const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    globalRouter.navigate = navigate;
  }, [navigate]);

  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
};
