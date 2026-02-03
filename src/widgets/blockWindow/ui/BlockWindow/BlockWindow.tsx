import { type Condition } from "@/src/entities";
import { DeleteBlockButton } from "@/src/features";
import { queryClient } from "@/src/shared/api";
import { CustomModalWindow, CustomSwitch, SettingsSvg } from "@/src/shared/ui";
import { Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useBlockInfo } from "../../model/useBlockInfo";
import BlockSettingsForm from "../BlockSettingsForm/BlockSettingsForm";
import ConditionsList from "../ConditionsList/ConditionsList";
import TaskList from "../TaskList/TaskList";
import "./BlockWindow.scss";
interface BlockWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  blockId: string;
  eventId: string;
  onCreateTask: (order: number) => void;
  onTaskClick: (id: string, order: number) => void;
  onConditionClick: (condition: Condition) => void;
  onCreateConditionBtnClick: () => void;
}

const BlockWindow = ({
  open,
  setIsOpen,
  blockId,
  eventId,
  onCreateTask,
  onTaskClick,
  onConditionClick,
  onCreateConditionBtnClick,
}: BlockWindowProps) => {
  const [windowState, setWindowState] = useState<
    "tasks" | "conditions" | "settings"
  >("tasks");

  const { data, isPending, isError } = useBlockInfo(eventId, blockId);

  const handleSuccessBlockDeleting = async () => {
    await queryClient.invalidateQueries({
      queryKey: [eventId, "data"],
    });
    setIsOpen(false);
  };

  const [name, setName] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
    }
  }, [data]);

  const handleSettingsBtnClick = () => {
    setWindowState((prev) => {
      if (prev === "settings") {
        return "tasks";
      }
      return "settings";
    });
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
        setWindowState("tasks");
      }}
    >
      <Typography.Text className="block-window__order">
        {data.order}
      </Typography.Text>
      <div className="block-window__header">
        {windowState === "settings" ? (
          <DeleteBlockButton
            eventId={eventId}
            blockId={blockId}
            onSuccess={handleSuccessBlockDeleting}
          />
        ) : (
          <CustomSwitch
            value={windowState === "conditions"}
            onChange={() => {
              setWindowState((prev) => {
                return prev === "conditions" ? "tasks" : "conditions";
              });
            }}
          />
        )}
        <Input
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          //todo: добавить отправку запроса на изменение названия
          // onBlur={}
          variant="borderless"
          classNames={{
            input: "block-window__name-input",
          }}
        />
        <Button
          onClick={handleSettingsBtnClick}
          className="block-window__settings-btn"
          style={{
            backgroundColor:
              windowState === "settings" ? "var(--primary-color)" : "inherit",
            color:
              windowState === "settings" ? "white" : "var(--primary-color)",
          }}
        >
          <SettingsSvg />
        </Button>
      </div>
      <div className="block-window__body">
        {windowState === "tasks" ? (
          <TaskList
            eventId={eventId}
            blockId={blockId}
            onCreateTask={onCreateTask}
            onTaskClick={onTaskClick}
          />
        ) : windowState === "conditions" ? (
          <ConditionsList
            eventId={eventId}
            blockId={blockId}
            onConditionClick={onConditionClick}
            onCreateConditionBtnClick={onCreateConditionBtnClick}
          />
        ) : (
          <BlockSettingsForm
            eventId={eventId}
            blockId={blockId}
            initialData={data}
          />
        )}
      </div>
    </CustomModalWindow>
  );
};

export default BlockWindow;
