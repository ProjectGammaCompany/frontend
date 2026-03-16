import {
  selectBlockReorderingState,
  selectEventName,
  setBlockReorderingState,
  setName,
  useEditingEventData,
  useUpdateBlocksOrder,
} from "@/src/entities";
import { AddBlockMenu } from "@/src/features";
import { useNotify } from "@/src/shared/lib";
import BlockItem from "@/src/widgets/eventContentByRole/BaseEditorContent/ui/BlockItem/BlockItem";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { Button, Typography } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlocksOrderInQuery } from "../../model/updateBlocksOrderInQuery";
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
  const name = useSelector(selectEventName);
  const notify = useNotify();

  const blockReorderingState = useSelector(selectBlockReorderingState);

  const dispatch = useDispatch();

  const { data, isPending, isError } = useEditingEventData(eventId);

  const handleSuccessBlocksOrderUpdating = () => {
    dispatch(setBlockReorderingState(false));
  };

  const handleFailedBlocksOrderUpdating = () => {
    notify.error({
      title: "Не удалось обновить порядок",
      description: "Произошла ошибка. Повторите попытку или попробуйте позже",
      placement: "top",
    });
  };

  const updateBlocksOrderMutation = useUpdateBlocksOrder(
    eventId,
    handleSuccessBlocksOrderUpdating,
    handleFailedBlocksOrderUpdating,
  );

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
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === draggableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (!data) {
        return;
      }
      dispatch(setBlockReorderingState(true));

      const newBlocks = Array.from(data.blocks);
      const movedBlock = data.blocks.find((block) => block.id === draggableId);
      if (!movedBlock) {
        return;
      }
      newBlocks.splice(source.index, 1);
      newBlocks.splice(destination.index, 0, movedBlock);
      newBlocks.forEach((block, index) => {
        newBlocks[index] = { ...block, order: index + 1 };
      });
      updateBlocksOrderInQuery(eventId, newBlocks);
    },
    [data, dispatch, eventId],
  );

  const handleBlockElementClick = (blockId: string) => {
    if (!blockReorderingState) {
      onBlockClick(blockId);
    }
  };

  const handleSaveBlockReordering = () => {
    if (data) {
      updateBlocksOrderMutation.mutate(data?.blocks.map((block) => block.id));
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setName(data.name));
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setBlockReorderingState(false));
    };
  }, [dispatch]);

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
          onElementClick={handleBlockElementClick}
        />
        <AddBlockMenu
          isHidden={blockReorderingState}
          eventId={eventId}
          blocks={data.blocks}
          onBlockCreate={(id) => onBlockCreate(id)}
        />
      </DragDropContext>
      {blockReorderingState && (
        <Button
          className="base-editor-content__save-block-reordering-btn"
          onClick={handleSaveBlockReordering}
          loading={updateBlocksOrderMutation.isPending}
        >
          Сохранить порядок
        </Button>
      )}
    </div>
  );
};

export default BaseEditorContent;
