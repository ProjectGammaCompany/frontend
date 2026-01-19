import { getEditingEventData, selectEventName, setName } from "@/src/entities";
import { AddBlockMenu } from "@/src/features";
import BlockItem from "@/src/widgets/eventContentByRole/editorContent/ui/BlockItem/BlockItem";
import { DragDropContext } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlockList from "../BlockList/BlockList";
import ConditionWindow from "../ConditionWindow/ConditionWindow";
import EditBlockWindow from "../EditBlockWindow/EditBlockWindow";
import TaskWindow from "../TaskWindow/TaskWindow";
import "./EditorContent.scss";

interface EditorContentProps {
  eventId: string;
}

//TODO: рефакторинг
const EditorContent = ({ eventId }: EditorContentProps) => {
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  const name = useSelector(selectEventName);
  const dispatch = useDispatch();

  const [editBlockWindowOpen, setEditBlockWindowOpen] = useState(false);

  const [taskWindowOpen, setTaskWindowOpen] = useState(false);

  const [conditionWindowOpen, setConditionWindowOpen] = useState(false);

  const [blockId, setBlockId] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: [eventId, "data"],
    queryFn: () => getEditingEventData(eventId),
    select: (data) => data.data,
  });

  const onAdd = useCallback((blockId: string) => {
    setBlockId(blockId);
    setEditBlockWindowOpen(true);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setName(data.name));
    }
  }, [data, dispatch]);

  if (isPending) {
    return <div>Загрузка...</div>;
  }
  if (isError) {
    return <div>Ошибка!</div>;
  }

  return (
    <div className="editor-content">
      <div className="editor-content__name">
        <Typography.Text className="editor-content__name-text">
          {name}
        </Typography.Text>
      </div>
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <BlockList
          blocks={data.blocks}
          BlockComponent={BlockItem}
          onElementClick={(blockId: string) => {
            setBlockId(blockId);
            setEditBlockWindowOpen(true);
          }}
        />
        <AddBlockMenu eventId={eventId} blocks={data.blocks} onAdd={onAdd} />
      </DragDropContext>
      {blockId && (
        <>
          <EditBlockWindow
            setTaskWindowOpen={setTaskWindowOpen}
            eventId={eventId}
            setConditionWindowOpen={setConditionWindowOpen}
            open={editBlockWindowOpen}
            setIsOpen={setEditBlockWindowOpen}
            blockId={blockId}
          />
          <TaskWindow
            open={taskWindowOpen}
            setIsOpen={setTaskWindowOpen}
            eventId={eventId}
            blockId={blockId}
          />
          <ConditionWindow
            open={conditionWindowOpen}
            setIsOpen={setConditionWindowOpen}
            eventId={eventId}
            blockId={blockId}
          />
        </>
      )}
    </div>
  );
};

export default EditorContent;
