import { usePlayerStats } from "@/entities";
import { Button, Flex, Spin, Typography } from "antd";
import GroupsStatsTable from "../GroupStatsTable/GroupsStatsTable";
import UserStatsTable from "../UserStatsTable/UserStatsTable";
import "./PlayerStats.scss";
interface PlayerStatsProps {
  eventId: string;
}

const PlayerStats = ({ eventId }: PlayerStatsProps) => {
  const { data, isPending, isError, refetch } = usePlayerStats(eventId);

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
    <div className="player-stats">
      {data.fullStats ? (
        data.groupEvent ? (
          <GroupsStatsTable groups={data.groups!} />
        ) : (
          <UserStatsTable users={data.users!} />
        )
      ) : (
        <>
          {data.users && data.users.length > 0 && (
            <>
              <Typography.Paragraph strong className="player-stats__text">
                Вами набрано баллов:
              </Typography.Paragraph>
              <Typography.Paragraph
                strong
                className="player-stats__text player-stats__points-text"
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

export default PlayerStats;
