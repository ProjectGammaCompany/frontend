import { DraggableCard } from "@/src/shared/lib";
import type { ReactNode } from "react";
import "./BlockCard.scss";

interface BlockCardProps {
  children?: ReactNode;
  draggableId: string;
  index: number;
}

const BlockCard = ({ children, draggableId, index }: BlockCardProps) => {
  return (
    <DraggableCard
      draggableId={draggableId}
      index={index}
      className="block-card"
    >
      {children}
    </DraggableCard>
  );
};

export default BlockCard;
