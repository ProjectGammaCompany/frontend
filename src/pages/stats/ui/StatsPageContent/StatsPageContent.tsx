import { Typography } from "antd";
import { useStats } from "../../model/useStats";
import "./StatsPageContent.scss";
interface StatsPageContentProps {
  eventId: string;
}

const StatsPageContent = ({ eventId }: StatsPageContentProps) => {
  const { data, isPending, isError } = useStats(eventId);

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
  }
  return (
    <div className="stats-page-content">
      {data.fullStats ? (
        <div>Таблица</div>
      ) : (
        <>
          {data.users && data.users.length > 0 && (
            <>
              <Typography.Paragraph strong className="stats-page-content__text">
                Вами набрано баллов:
              </Typography.Paragraph>
              <Typography.Paragraph
                strong
                className="stats-page-content__text stats-page-content__points-text"
              >
                {data.users[0].points}
              </Typography.Paragraph>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StatsPageContent;
