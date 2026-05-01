import { DraggableCard } from "@/shared/lib";
import { Typography } from "antd";
import type { ReactNode } from "react";
import "./BlockCard.scss";

interface BlockCardProps {
  children?: ReactNode;
  draggableId: string;
  index: number;
  title?: string;
  isDragDisabled?: boolean;
}

const BlockCard = ({
  children,
  draggableId,
  index,
  title,
  isDragDisabled,
}: BlockCardProps) => {
  return (
    <DraggableCard
      className="block-card__wrapper"
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      <div className="block-card">{children}</div>
      {Boolean(title) && (
        <Typography.Paragraph
          ellipsis={{ rows: 2 }}
          className="block-card__title"
        >
          {title}
        </Typography.Paragraph>
      )}
    </DraggableCard>
  );
};

export default BlockCard;
