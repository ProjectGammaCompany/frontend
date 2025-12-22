import { Draggable } from "@hello-pangea/dnd";
import type { ReactNode } from "react";
import CustomCard from "../Card/CustomCard";

interface DraggableCardProps {
  children?: ReactNode;
  index: number;
  draggableId: string;
  className?: string;
}

const DraggableCard = ({
  children,
  index,
  draggableId,
  className,
}: DraggableCardProps) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
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
