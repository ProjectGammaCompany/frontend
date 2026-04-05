import { useRole } from "@/entities";
import { Button, Flex, Spin, Typography } from "antd";
import EditorStats from "../EditorStats/EditorStats";
import PlayerStats from "../PlayerStats/PlayerStats";
interface StatsPageContentProps {
  eventId: string;
}

const StatsPageContent = ({ eventId }: StatsPageContentProps) => {
  const { data: role, isPending, isError, refetch } = useRole(eventId);

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

  if (role === 0) {
    return <PlayerStats eventId={eventId} />;
  }

  if (role === 1) {
    return <EditorStats eventId={eventId} />;
  }

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
};

export default StatsPageContent;
