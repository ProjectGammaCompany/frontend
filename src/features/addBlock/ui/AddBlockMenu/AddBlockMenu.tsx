import type {
  BlockItemData,
  getEditingEventDataResponse,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import { BackSvg } from "@/src/shared/ui";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import classnames from "classnames";
import { useCallback, useState } from "react";
import { addBlock, type AddBlockResponse } from "../../api/addBlock";
import { TYPES_ARRAY } from "../../const/typesArray";
import AddBlockArea from "../AddBlockArea/AddBlockArea";
import MenuItem from "../MenuItem/MenuItem";
import "./AddBlockMenu.scss";

interface AddBlockMenuProps {
  eventId: string;
  blocks: BlockItemData[];
  onAdd?: (blockId: string) => void;
}
const AddBlockMenu = ({ eventId, blocks, onAdd }: AddBlockMenuProps) => {
  const [openMenu, setMenuIsOpen] = useState(false);

  const [showArea, setShowArea] = useState(false);

  const className = classnames("add-block-menu", {
    "add-block-menu_open": openMenu,
  });

  const mutation = useMutation<
    AxiosResponse<AddBlockResponse>,
    Error,
    { eventId: string; isParallel: boolean; name: string; order: number }
  >({
    mutationKey: ["addBlock", eventId],
    mutationFn: addBlock,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        [eventId, "data"],
        (oldData: AxiosResponse<getEditingEventDataResponse>) => {
          if (!oldData) {
            return oldData;
          }
          const newBlock: BlockItemData = {
            id: data.data.blockId,
            name: variables.name,
            order: variables.order,
            conditionsWithoutBlocks: false,
            connectedBlocks: false,
            isParallel: variables.isParallel,
          };
          return {
            ...oldData,
            data: {
              ...oldData.data,
              blocks: [...blocks, newBlock],
            },
          };
        },
      );
      onAdd?.(data.data.blockId);
    },
  });

  const onBeforeCapture = useCallback(() => {
    setShowArea(true);
  }, []);

  const onDragStart = useCallback(() => {
    ///
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!destination) {
        setShowArea(false);
        return;
      }

      if (destination.droppableId === source.droppableId) {
        setShowArea(false);
        return;
      }
      if (draggableId !== "consistent" && draggableId != "parallel") {
        setShowArea(false);
      }
      const isParallel = draggableId === "parallel";
      const order = blocks.length;
      mutation.mutate({
        eventId: eventId,
        order: order + 1,
        isParallel: isParallel,
        name: "Блок " + (order + 1),
      });
      setShowArea(false);
    },
    [blocks.length, eventId, mutation],
  );

  const iconClassNames = classnames("add-block-menu__icon", {
    "add-block-menu__icon_opened": openMenu,
  });

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onBeforeCapture={onBeforeCapture}
    >
      <AddBlockArea showArea={showArea} />
      <div className={className}>
        <button
          onClick={() => {
            setMenuIsOpen((prev) => !prev);
          }}
          className="add-block-menu__open-btn"
        >
          <BackSvg classname={iconClassNames} />
        </button>
        <Droppable droppableId="blockMenu" direction="horizontal">
          {(provided) => (
            <div
              className="add-block-menu__blocks-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {TYPES_ARRAY.map((type, index) => (
                <MenuItem key={type} type={type} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default AddBlockMenu;
