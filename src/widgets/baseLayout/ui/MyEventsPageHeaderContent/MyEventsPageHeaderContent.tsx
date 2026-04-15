import { Logo } from "@/shared/ui";
import { Typography } from "antd";
import { Link, useLocation } from "react-router";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import "./MyEventsPageHeaderContent.scss";

const MyEventsPageHeaderContent = () => {
  const { pathname } = useLocation();
  return (
    <div className="my-events-page-header-content">
      <Link to="/home">
        <Logo className="my-events-page-header-content__logo" />
      </Link>
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
