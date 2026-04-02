import { getEditingEventData, setName, type Condition } from "@/src/entities";
import { Seo } from "@/src/shared/lib";
import {
  BaseEditorContent,
  BlockWindow,
  ConditionWindow,
  TaskWindow,
  type TaskWindowMode,
} from "@/src/widgets";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCondition, setCondition } from "../../model/conditionSlice";
import {
  selectTaskId,
  selectTaskOrder,
  setTaskId,
  setTaskOrder,
} from "../../model/taskDataSlice";
import "./EditorContent.scss";

interface EditorContentProps {
  eventId: string;
}

const EditorContent = ({ eventId }: EditorContentProps) => {
  const dispatch = useDispatch();

  const taskOrder = useSelector(selectTaskOrder);
  const editTaskId = useSelector(selectTaskId);
  const currentCondition = useSelector(selectCondition);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [eventId, "data"],
    queryFn: () => getEditingEventData(eventId),
    select: (data) => data.data,
  });

  const [taskWindowMode, setTaskWindowMode] =
    useState<TaskWindowMode>("create");

  const [conditionWindowMode, setConditionWindowMode] =
    useState<TaskWindowMode>("create");

  const [blockId, setBlockId] = useState<string | null>(null);
  const [blockWindowOpen, setBlockWindowOpen] = useState(false);

  const [taskWindowOpen, setTaskWindowOpen] = useState(false);
  const [conditionWindowOpen, setConditionWindowOpen] = useState(false);

  const handleCreateTaskBtnClick = (order: number) => {
    dispatch(setTaskId(""));
    dispatch(setTaskOrder(order));
    setTaskWindowMode("create");
    setTaskWindowOpen(true);
  };
  const handleTaskClick = (id: string, order: number) => {
    dispatch(setTaskId(id));
    dispatch(setTaskOrder(order));
    setTaskWindowMode("edit");
    setTaskWindowOpen(true);
  };

  const handleBlockClick = (id: string) => {
    setBlockId(id);
    setBlockWindowOpen(true);
  };

  const handleBlockCreate = (id: string) => {
    setBlockId(id);
    setBlockWindowOpen(true);
  };

  const handleConditionGroupsUpdate = (groups: string[]) => {
    if (currentCondition) {
      dispatch(
        setCondition({
          ...currentCondition,
          group: groups,
        }),
      );
    }
  };

  const handleConditionClick = (condition: Condition) => {
    dispatch(setCondition(condition));
    setConditionWindowMode("edit");
    setConditionWindowOpen(true);
  };
  const handleCreateConditionBtnClick = () => {
    dispatch(setCondition(null));
    setConditionWindowMode("create");
    setConditionWindowOpen(true);
  };

  const handleTaskWindowClose = () => {
    dispatch(setTaskId(""));
  };

  const handleBlockWindowError = () => {
    setBlockId(null);
  };

  useEffect(() => {
    if (data) {
      dispatch(setName(data.name));
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setName(""));
      dispatch(setCondition(null));
      dispatch(setTaskId(""));
      dispatch(setTaskOrder(0));
    };
  }, [dispatch]);

  if (isPending) {
    return (
      <Flex justify="center" className="editor-content__loading-block">
        <Spin />
      </Flex>
    );
  }
  if (isError) {
    return (
      <Flex justify="center" align="center" vertical gap={10}>
        <Typography.Paragraph
          type="danger"
          className="editor-content__error-text"
        >
          Произошла ошибка. Обновите страницу
        </Typography.Paragraph>
        <Button
          onClick={() => {
            void refetch();
          }}
          className="editor-content__refetch-btn"
        >
          Обновить
        </Button>
      </Flex>
    );
  }
  return (
    <div>
      <Seo
        title="Редактор события"
        description="Страница редактирования события."
        canonical={`/event/${eventId}`}
        noIndex
      />
      <BaseEditorContent
        eventId={eventId}
        onTaskClick={handleTaskClick}
        onBlockClick={handleBlockClick}
        onBlockCreate={handleBlockCreate}
      />
      {blockId && (
        <>
          <BlockWindow
            eventId={eventId}
            open={blockWindowOpen}
            setIsOpen={setBlockWindowOpen}
            blockId={blockId}
            onCreateTask={handleCreateTaskBtnClick}
            onTaskClick={handleTaskClick}
            onConditionClick={handleConditionClick}
            onCreateConditionBtnClick={handleCreateConditionBtnClick}
            onError={handleBlockWindowError}
          />
          <TaskWindow
            order={taskOrder}
            open={taskWindowOpen}
            setIsOpen={setTaskWindowOpen}
            eventId={eventId}
            blockId={blockId}
            {...(taskWindowMode === "edit" && editTaskId
              ? { mode: "edit", editData: { id: editTaskId } }
              : { mode: "create" })}
            onClose={
              taskWindowMode === "edit" ? handleTaskWindowClose : undefined
            }
          />
          <ConditionWindow
            open={conditionWindowOpen}
            setIsOpen={setConditionWindowOpen}
            eventId={eventId}
            blockId={blockId}
            {...(conditionWindowMode === "edit" && currentCondition
              ? {
                  mode: "edit",
                  editData: {
                    condition: currentCondition,
                    updateConditionGroups: handleConditionGroupsUpdate,
                  },
                }
              : {
                  mode: "create",
                })}
          />
        </>
      )}
    </div>
  );
};

export default EditorContent;
