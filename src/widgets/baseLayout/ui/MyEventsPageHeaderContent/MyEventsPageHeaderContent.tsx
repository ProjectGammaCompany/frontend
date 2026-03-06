import { Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import { useLocation } from "react-router";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import "./MyEventsPageHeaderContent.scss";

const MyEventsPageHeaderContent = () => {
  const { pathname } = useLocation();
  return (
    <div className="my-events-page-header-content">
      <Logo />
      <Typography.Title
        level={1}
        className="my-events-page-header-content__text"
      >
        Мои события
      </Typography.Title>
      <div className="my-events-page-header-content__buttons-wrapper">
        <NavigationButtons pathname={pathname} />
      </div>
    </div>
  );
};

export default MyEventsPageHeaderContent;
