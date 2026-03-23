import { Button, Flex, Spin, Typography } from "antd";
import { useStats } from "../../model/useStats";
import "./StatsPageContent.scss";
interface StatsPageContentProps {
  eventId: string;
}

const StatsPageContent = ({ eventId }: StatsPageContentProps) => {
  const { data, isPending, isError, refetch } = useStats(eventId);

  if (isPending) {
    return (
      <Flex justify="center">
        <Spin />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" vertical>
        <Typography.Paragraph type="danger">
          Возникла ошибка при загрузке. Обновите страницу
        </Typography.Paragraph>
        <Button
          onClick={() => {
            void refetch();
          }}
        >
          Обновить
        </Button>
      </Flex>
    );
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
