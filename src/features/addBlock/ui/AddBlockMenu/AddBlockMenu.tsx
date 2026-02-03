import type { BlockItemData } from "@/src/entities";
import { BackSvg } from "@/src/shared/ui";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import classnames from "classnames";
import { useCallback, useState } from "react";
import { TYPES_ARRAY } from "../../const/typesArray";
import { useAddBlockMutation } from "../../model/useAddBlockMutation";
import AddBlockArea from "../AddBlockArea/AddBlockArea";
import MenuItem from "../MenuItem/MenuItem";
import "./AddBlockMenu.scss";

interface AddBlockMenuProps {
  eventId: string;
  blocks: BlockItemData[];
  onBlockCreate?: (blockId: string) => void;
}
const AddBlockMenu = ({
  eventId,
  blocks,
  onBlockCreate,
}: AddBlockMenuProps) => {
  const [openMenu, setMenuIsOpen] = useState(false);

  const [showArea, setShowArea] = useState(false);

  const className = classnames("add-block-menu", {
    "add-block-menu_open": openMenu,
  });

  const addBlockMutation = useAddBlockMutation(eventId, blocks, onBlockCreate);

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
      addBlockMutation.mutate({
        eventId: eventId,
        order: order + 1,
        isParallel: isParallel,
        name: "Блок " + (order + 1),
      });
      setShowArea(false);
    },
    [blocks.length, eventId, addBlockMutation],
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
