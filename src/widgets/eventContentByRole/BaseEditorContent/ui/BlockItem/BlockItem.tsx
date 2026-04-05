import { BlockCard, type BlockItemData } from "@/entities";
import { Typography } from "antd";
import "./BlockItem.scss";
interface BlockItemProps {
  data: BlockItemData;
  index: number;
  onClick: () => void;
}

const BlockItem = ({ data, index, onClick }: BlockItemProps) => {
  return (
    <li onClick={onClick}>
      <BlockCard index={index} draggableId={data.id}>
        <Typography.Text className="block-item__order-text">
          {data.order}
        </Typography.Text>
        {data.conditionsWithoutBlocks && (
          <div className="block-item__connection" />
        )}
      </BlockCard>
    </li>
  );
};

export default BlockItem;
