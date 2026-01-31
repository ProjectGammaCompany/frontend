import { Draggable } from "@hello-pangea/dnd";
import type { ReactNode } from "react";
import CustomCard from "../Card/CustomCard";

interface DraggableCardProps {
  children?: ReactNode;
  index: number;
  draggableId: string;
  className?: string;
  isDragDisabled?: boolean;
}

const DraggableCard = ({
  children,
  index,
  draggableId,
  className,
  isDragDisabled,
}: DraggableCardProps) => {
  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <CustomCard
          dragHandleProps={provided.dragHandleProps}
          draggableProps={provided.draggableProps}
          ref={provided.innerRef}
          className={className}
        >
          {children}
        </CustomCard>
      )}
    </Draggable>
  );
};

export default DraggableCard;
