import { BlockCard } from "@/entities/Block";
import { CoherentBlockSvg, ParallelBlockSvg } from "@/shared/ui/svg";

interface MenuItemProps {
  type: "parallel" | "consistent";
  index: number;
}

const MenuItem = ({ type, index }: MenuItemProps) => {
  return (
    <BlockCard
      draggableId={type}
      index={index}
      title={
        type === "consistent"
          ? "Линейный блок задач"
          : "Параллельный блок задач"
      }
    >
      {type === "consistent" ? <CoherentBlockSvg /> : <ParallelBlockSvg />}
    </BlockCard>
  );
};

export default MenuItem;
