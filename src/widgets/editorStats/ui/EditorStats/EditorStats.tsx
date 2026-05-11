import { useEditorStats } from "@/entities/Event";
import { Button, Flex, Segmented, Spin, Typography } from "antd";
import { useState } from "react";
import GroupsStats from "../GroupsStats//GroupsStats";
import SingleUserStats from "../SingleUserStats/SingleUserStats";
import UsersStatsTable from "../UsersStatsTable/UsersStatsTable";
import "./EditorStats.scss";
interface EditorStatsProps {
  eventId: string;
}

const EditorStats = ({ eventId }: EditorStatsProps) => {
  const { data, isPending, isError, refetch } = useEditorStats(eventId);

  const STATS_MODES = ["Общая", "По участнику"] as const;

  type Mode = (typeof STATS_MODES)[number];

  const [mode, setMode] = useState<Mode>(STATS_MODES[0]);

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
      <Segmented
        classNames={{
          root: "editor-stats__segmented",
        }}
        options={[...STATS_MODES]}
        onChange={(value: Mode) => setMode(value)}
      />
      {mode === "Общая" ? (
        data.groupEvent ? (
          <GroupsStats groups={data.groups!} />
        ) : (
          <UsersStatsTable users={data.users!} />
        )
      ) : (
        <SingleUserStats
          eventId={eventId}
          groupEvent={data.groupEvent}
          users={data.users}
          groups={data.groups}
        />
      )}
    </div>
  );
};

export default EditorStats;
