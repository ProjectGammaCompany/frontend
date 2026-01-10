import { BackSvg, Header, Logo } from "@/src/shared/ui";
import { Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import StatsPageContent from "../StatsPageContent/StatsPageContent";
import "./StatsPage.scss";
const StatsPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  if (!eventId) {
    return <div>Ошибка!</div>;
  }
  return (
    <div>
      <Header>
        <div className="stats-page-header__content">
          <div
            className="stats-page-header__icons-wrapper"
            onClick={() => void navigate(-1)}
          >
            <BackSvg classname="stats-page-header__back-icon" />
            <Logo />
          </div>
          <Typography.Title level={1} className="stats-page-header__title">
            Статистика
          </Typography.Title>
        </div>
      </Header>
      <StatsPageContent eventId={eventId} />
    </div>
  );
};

export default StatsPage;
