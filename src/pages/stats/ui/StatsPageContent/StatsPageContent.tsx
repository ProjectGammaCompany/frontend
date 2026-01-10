import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { getPlayerStats } from "../../api/getPlayerStats";
import "./StatsPageContent.scss";
interface StatsPageContentProps {
  eventId: string;
}

const StatsPageContent = ({ eventId }: StatsPageContentProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [eventId, "stats"],
    queryFn: () => getPlayerStats(eventId),
    select: (data) => data.data,
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
  }
  return (
    <div className="stats-page-content">
      <Typography.Paragraph strong className="stats-page-content__text">
        Вами набрано баллов:
      </Typography.Paragraph>
      <Typography.Paragraph
        strong
        className="stats-page-content__text stats-page-content__points-text"
      >
        {data.points}
      </Typography.Paragraph>
    </div>
  );
};

export default StatsPageContent;
