import type {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";
import type { ReactNode } from "react";
interface TaskCardProps {
  children?: ReactNode;
  ref?: (element?: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  className?: string;
}

const CustomCard = ({
  children,
  dragHandleProps,
  draggableProps,
  ref,
  className,
}: TaskCardProps) => {
  return (
    <div
      className={className}
      ref={ref}
      {...dragHandleProps}
      {...draggableProps}
    >
      {children}
    </div>
  );
};

export default CustomCard;
