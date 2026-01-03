import type { Condition } from "@/src/entities";
import { Typography } from "antd";
import "./ConditionItem.scss";
interface ConditionItemProps {
  condition: Condition;
  onClick?: () => void;
}

const ConditionItem = ({ condition, onClick }: ConditionItemProps) => {
  const getText = (condition: Condition) => {
    const subconditions = [];
    if (condition.min != -1) {
      subconditions.push(`=> ${condition.min}`);
    }
    if (condition.max != -1) {
      subconditions.push(`< ${condition.max}`);
    }
    return subconditions.join(" И ");
  };

  return (
    <div key={condition.blockId} className="condition-item" onClick={onClick}>
      <div className="condition-item__text-wrapper">
        <Typography.Text>{getText(condition)}</Typography.Text>
      </div>
      {condition.blockId && (
        <div className="condition-item__connected-block">
          <Typography.Text>{condition.blockOrder}</Typography.Text>
        </div>
      )}
    </div>
  );
};

export default ConditionItem;
