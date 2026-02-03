import { selectEventName, setName } from "@/src/entities";
import { AddBlockMenu } from "@/src/features";
import BlockItem from "@/src/widgets/eventContentByRole/BaseEditorContent/ui/BlockItem/BlockItem";
import { DragDropContext } from "@hello-pangea/dnd";
import { Typography } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditingEventData } from "../../model/useEditingEventData";
import BlockList from "../BlockList/BlockList";
import "./BaseEditorContent.scss";

interface EditorContentProps {
  eventId: string;
  onTaskClick: (id: string, order: number) => void;
  onBlockClick: (id: string) => void;
  onBlockCreate: (id: string) => void;
}

//TODO: рефакторинг
const BaseEditorContent = ({
  eventId,
  onBlockCreate,
  onBlockClick,
}: EditorContentProps) => {
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

  const { data, isPending, isError } = useEditingEventData(eventId);

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
    <div className="base-editor-content">
      <div className="base-editor-content__name">
        <Typography.Text className="base-editor-content__name-text">
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
          onElementClick={(blockId: string) => onBlockClick(blockId)}
        />
        <AddBlockMenu
          eventId={eventId}
          blocks={data.blocks}
          onBlockCreate={(id) => onBlockCreate(id)}
        />
      </DragDropContext>
    </div>
  );
};

export default BaseEditorContent;
