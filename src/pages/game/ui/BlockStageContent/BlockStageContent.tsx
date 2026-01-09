import type { BlockStage } from "../../api";

interface BlockStageProps {
  block: BlockStage;
}

const BlockStageContent = ({ block }: BlockStageProps) => {
  console.log(block);

  return <div>Сцена с блоком</div>;
};

export default BlockStageContent;
