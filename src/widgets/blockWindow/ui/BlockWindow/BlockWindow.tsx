import {
  selectTasksReorderingState,
  setTasksReorderingState,
  useBlockSettings,
  useUpdateBlockName,
  type Condition,
  type UpdateBlockData,
} from "@/entities";
import { DeleteBlockButton } from "@/features";
import { queryClient } from "@/shared/api";
import { useDebounce, useNotify } from "@/shared/lib";
import { CustomModalWindow, CustomSwitch, SettingsSvg } from "@/shared/ui";
import { Button, Input, Typography } from "antd";
import { useEffect, useEffectEvent, useState } from "react";
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

  const onChangedName = useEffectEvent((name: string) => {
    if (isInitialized && !updateBlockNameMutation.isPending) {
      updateBlockNameMutation.mutate(name);
    }
  });

  const [settingFormData, setSettingsFormData] = useState<UpdateBlockData>({
    isParallel: false,
    points: false,
    rightAnswers: false,
  });

  const { data, isPending, isError } = useBlockSettings(eventId, blockId);

  const tasksReorderingState = useSelector(selectTasksReorderingState);

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleErrorBlockNameUpdate = () => {
    notify.error({
      title: "Не удалось обновить название блока.",
      description: "Произошла ошибка. Измените название снова",
    });
  };

  const updateBlockNameMutation = useUpdateBlockName(
    eventId,
    blockId,
    handleErrorBlockNameUpdate,
  );

  const [isInitialized, setIsInitialized] = useState(false);

  const debounceName = useDebounce(name, 1000);

  const handleSuccessBlockDeleting = async () => {
    await queryClient.invalidateQueries({
      queryKey: [eventId, "data"],
    });
    notify.success({
      title: "Блок успешно удалён",
    });
    setIsOpen(false);
  };

  const handleErrorBlockDeleting = () => {
    notify.error({
      title: "Не удалось удалить блок",
      description: "Произошла ошибка. Повторите попытку позже",
    });
  };

  const handleSettingsBtnClick = () => {
    setWindowState((prev) => {
      if (prev === "settings") {
        return "tasks";
      }
      return "settings";
    });
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSettingsFormData({
        isParallel: data.isParallel,
        points: data.points,
        rightAnswers: data.rightAnswers,
      });
    }
  }, [data]);

  useEffect(() => {
    onChangedName(debounceName);
    //использован useEffectEvet
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceName]);

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
            onError={handleErrorBlockDeleting}
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
