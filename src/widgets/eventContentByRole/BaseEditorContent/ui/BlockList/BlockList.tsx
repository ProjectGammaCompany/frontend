import type { BlockItemData } from "@/entities/Event";
import { Droppable } from "@hello-pangea/dnd";
import { type JSX } from "react";
import "./BlockList.scss";
interface BlocksListProps {
  blocks: BlockItemData[];
  BlockComponent: ({
    data,
    index,
    onClick,
  }: {
    data: BlockItemData;
    index: number;
    onClick: () => void;
  }) => JSX.Element;
  onElementClick?: (blockId: string) => void;
}

const BlockList = ({
  blocks,
  BlockComponent,
  onElementClick,
}: BlocksListProps) => {
  return (
    <Droppable droppableId="blockList">
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="block-list"
        >
          {blocks.map((block, index) => (
            <BlockComponent
              key={block.id}
              data={block}
              index={index}
              onClick={() => {
                onElementClick?.(block.id);
              }}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default BlockList;
