import { getEditingBlockData } from "@/src/entities";
import { DeleteBlockButton } from "@/src/features";
import { queryClient } from "@/src/shared/api";
import { CustomModalWindow } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, Switch, Typography } from "antd";
import { useState } from "react";
import BlockSettingsForm from "../BlockSettingsForm/BlockSettingsForm";
import ConditionsList from "../ConditionsList/ConditionsList";
import TaskList from "../TaskList/TaskList";
import "./EditBlockWindow.scss";
interface EditBlockWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  blockId: string;
  eventId: string;
  setTaskWindowOpen: (value: boolean) => void;
  setConditionWindowOpen: (value: boolean) => void;
}

const EditBlockWindow = ({
  open,
  setIsOpen,
  blockId,
  eventId,
  setTaskWindowOpen,
  setConditionWindowOpen,
}: EditBlockWindowProps) => {
  const [windowState, setWindowState] = useState<"tasks" | "conditions">(
    "tasks",
  );

  const [openSettings, setOpenSettings] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: [eventId, blockId, "blockInfo"],
    queryFn: () => getEditingBlockData(eventId, blockId),
    select: (data) => data.data,
  });

  const handleSuccessBlockDeleting = async () => {
    await queryClient.invalidateQueries({
      queryKey: [eventId, "data"],
    });
    setIsOpen(false);
  };

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
  }

  return (
    <CustomModalWindow
      open={open}
      setIsOpen={setIsOpen}
      afterClose={() => {
        setOpenSettings(false);
        setWindowState("tasks");
      }}
    >
      <Typography.Text className="edit-block-window__order">
        {data.order}
      </Typography.Text>
      <div className="edit-block-window__header">
        {openSettings ? (
          <DeleteBlockButton
            eventId={eventId}
            blockId={blockId}
            onSuccess={handleSuccessBlockDeleting}
          />
        ) : (
          <Switch
            value={windowState === "conditions"}
            onChange={() => {
              setWindowState(
                //TODO сделать лучше
                windowState === "conditions" ? "tasks" : "conditions",
              );
            }}
          />
        )}
        <Typography.Title level={2}>{data.name}</Typography.Title>
        <Button
          onClick={() => {
            setOpenSettings((prev) => !prev);
          }}
        >
          Наст
        </Button>
      </div>
      {openSettings ? (
        <BlockSettingsForm
          eventId={eventId}
          blockId={blockId}
          initialData={data}
        />
      ) : windowState === "tasks" ? (
        <TaskList
          eventId={eventId}
          blockId={blockId}
          setTaskWindowOpen={setTaskWindowOpen}
        />
      ) : (
        <ConditionsList
          eventId={eventId}
          blockId={blockId}
          setConditionWindowOpen={setConditionWindowOpen}
        />
      )}
    </CustomModalWindow>
  );
};

export default EditBlockWindow;
