import { BlockCard } from "@/src/entities";
import { Typography } from "antd";

interface MenuItemProps {
  type: "parallel" | "consistent";
  index: number;
}

//todo: поменять подписи на svg картинки
const MenuItem = ({ type, index }: MenuItemProps) => {
  return (
    <BlockCard draggableId={type} index={index}>
      {type === "consistent" ? (
        <Typography
          style={{
            color: "white",
          }}
        >
          Послед
        </Typography>
      ) : (
        <Typography
          style={{
            color: "white",
          }}
        >
          Паралл
        </Typography>
      )}
    </BlockCard>
  );
};

export default MenuItem;
