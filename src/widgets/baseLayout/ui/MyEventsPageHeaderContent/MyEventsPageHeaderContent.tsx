import { Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import "./MyEventsPageHeaderContent.scss";
const MyEventsPageHeaderContent = () => {
  return (
    <div className="my-events-page-header-content">
      <Logo />
      <Typography.Title
        level={1}
        className="my-events-page-header-content__text"
      >
        Мои события
      </Typography.Title>
    </div>
  );
};

export default MyEventsPageHeaderContent;
