import { DraggableCard } from "@/src/shared/lib";
import type { ReactNode } from "react";
import "./BlockCard.scss";

interface BlockCardProps {
  children?: ReactNode;
  draggableId: string;
  index: number;
  isDragDisabled?: boolean;
}

const BlockCard = ({
  children,
  draggableId,
  index,
  isDragDisabled,
}: BlockCardProps) => {
  return (
    <DraggableCard
      draggableId={draggableId}
      index={index}
      className="block-card"
      isDragDisabled={isDragDisabled}
    >
      {children}
    </DraggableCard>
  );
};

export default BlockCard;
