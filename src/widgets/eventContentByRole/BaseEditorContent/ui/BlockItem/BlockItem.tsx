import { BlockCard, type BlockItemData } from "@/entities";
import { CoherentBlockSvg, ParallelBlockSvg } from "@/shared/ui";
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
      <BlockCard index={index} draggableId={data.id} title={data.name}>
        <Typography.Text className="block-item__order-text">
          {data.order}
        </Typography.Text>
        {data.isParallel ? <ParallelBlockSvg /> : <CoherentBlockSvg />}
      </BlockCard>
    </li>
  );
};

export default BlockItem;
