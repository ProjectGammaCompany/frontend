import { BlockCard } from "@/src/entities";
import { Typography } from "antd";

interface MenuItemProps {
  type: "parallel" | "consistent";
  index: number;
}

const MenuItem = ({ type, index }: MenuItemProps) => {
  return (
    <BlockCard draggableId={type} index={index}>
      {!type ? (
        <Typography>Послед</Typography>
      ) : (
        <Typography>Паралл</Typography>
      )}
    </BlockCard>
  );
};

export default MenuItem;
