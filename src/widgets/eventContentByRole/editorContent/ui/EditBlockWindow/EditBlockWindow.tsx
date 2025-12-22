import { getEditingBlockData } from "@/src/entities";
import { CustomModalWindow } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, Switch, Typography } from "antd";
import { useState } from "react";
import ConditionsList from "../ConditionsList/ConditionsList";
import TaskList from "../TaskList/TaskList";
import "./EditBlockWindow.scss";
interface EditBlockWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  blockId: string;
  eventId: string;
  setTaskWindowOpen: (value: boolean) => void;
}

const EditBlockWindow = ({
  open,
  setIsOpen,
  blockId,
  eventId,
  setTaskWindowOpen,
}: EditBlockWindowProps) => {
  const [windowState, setWindowState] = useState<"tasks" | "conditions">(
    "tasks",
  );

  const { data, isPending, isError } = useQuery({
    queryKey: [eventId, blockId, "blockInfo"],
    queryFn: () => getEditingBlockData(eventId, blockId),
    select: (data) => data.data,
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
  }

  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <Typography.Text className="edit-block-window__order">
        {data.order}
      </Typography.Text>
      <div className="edit-block-window__header">
        <Switch
          value={windowState === "conditions"}
          onChange={() => {
            setWindowState(
              //TODO сделать лучше
              windowState === "conditions" ? "tasks" : "conditions",
            );
          }}
        />
        <Typography.Title level={2}>{data.name}</Typography.Title>
        <Button>Наст</Button>
      </div>
      {windowState === "tasks" ? (
        <TaskList
          eventId={eventId}
          blockId={blockId}
          setTaskWindowOpen={setTaskWindowOpen}
        />
      ) : (
        <ConditionsList eventId={eventId} blockId={blockId} />
      )}
    </CustomModalWindow>
  );
};

export default EditBlockWindow;
