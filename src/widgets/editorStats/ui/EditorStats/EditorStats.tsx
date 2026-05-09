import { useEditorStats } from "@/entities/Event";
import { Button, Flex, Spin, Typography } from "antd";
import GroupContent from "../GroupContent/GroupContent";
import UsersStatsTable from "../UsersStatsTable/UsersStatsTable";

interface EditorStatsProps {
  eventId: string;
}

const EditorStats = ({ eventId }: EditorStatsProps) => {
  const { data, isPending, isError, refetch } = useEditorStats(eventId);

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
    <div className="editor-stats">
      {data.groupEvent ? (
        <GroupContent groups={data.groups!} />
      ) : (
        <UsersStatsTable users={data.users!} />
      )}
    </div>
  );
};

export default EditorStats;
