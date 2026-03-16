import {
  selectTasksReorderingState,
  setTasksReorderingState,
  useBlockSettings,
  useUpdateBlockName,
  type Condition,
  type UpdateBlockData,
} from "@/src/entities";
import { DeleteBlockButton } from "@/src/features";
import { queryClient } from "@/src/shared/api";
import { useDebounce, useNotify } from "@/src/shared/lib";
import { CustomModalWindow, CustomSwitch, SettingsSvg } from "@/src/shared/ui";
import { Button, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  onError: () => void;
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
  onError,
}: BlockWindowProps) => {
  const notify = useNotify();
  const [windowState, setWindowState] = useState<
    "tasks" | "conditions" | "settings"
  >("tasks");

  const { data, isPending, isError } = useBlockSettings(eventId, blockId);

  const tasksReorderingState = useSelector(selectTasksReorderingState);

  const dispatch = useDispatch();

  const handleSuccessBlockDeleting = async () => {
    await queryClient.invalidateQueries({
      queryKey: [eventId, "data"],
    });
    setIsOpen(false);
  };

  const [name, setName] = useState("");

  const updateBlockNameMutation = useUpdateBlockName(eventId, blockId);

  const [isInitialized, setIsInitialized] = useState(false);

  const debounceName = useDebounce(name, 1500);

  useEffect(() => {
    if (data) {
      setName(data.name);
    }
  }, [data]);

  useEffect(() => {
    if (!isInitialized) return;
    updateBlockNameMutation.mutate(debounceName);
  }, [debounceName, isInitialized, updateBlockNameMutation]);

  const handleSettingsBtnClick = () => {
    setWindowState((prev) => {
      if (prev === "settings") {
        return "tasks";
      }
      return "settings";
    });
  };

  if (isPending) {
    return;
  }

  if (isError) {
    notify.error({
      title: "Не удалось загрузить данные",
      description: "Произошла ошибка. Попробуйте нажать снова",
    });
    onError();
    return <></>;
  }

  const settingFormData: UpdateBlockData = {
    isParallel: data.isParallel,
    points: data.points,
    rightAnswers: data.rightAnswers,
  };

  return (
    <CustomModalWindow
      open={open}
      setIsOpen={setIsOpen}
      afterClose={() => {
        setWindowState("tasks");
        dispatch(setTasksReorderingState(false));
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
            disabled={tasksReorderingState}
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
            setIsInitialized(true);
          }}
          variant="borderless"
          classNames={{
            input: "block-window__name-input",
          }}
        />
        <Button
          onClick={handleSettingsBtnClick}
          disabled={tasksReorderingState}
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
            initialData={settingFormData}
          />
        )}
      </div>
    </CustomModalWindow>
  );
};

export default BlockWindow;
