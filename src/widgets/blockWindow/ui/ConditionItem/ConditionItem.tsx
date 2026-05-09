import type { Condition } from "@/entities/Block";
import { Typography } from "antd";
import "./ConditionItem.scss";
interface ConditionItemProps {
  condition: Condition;
  onClick?: () => void;
}

const ConditionItem = ({ condition, onClick }: ConditionItemProps) => {
  const getText = (condition: Condition) => {
    const stringParts: string[] = [];
    if (condition.min != -1 || condition.max != -1) {
      stringParts.push("Баллов ");
    }
    if (condition.min != -1) {
      stringParts.push(`> ${condition.min} или = ${condition.min}`);
      if (condition.max != -1) {
        stringParts.push(`И < ${condition.max}`);
      }
    } else if (condition.max != -1) {
      stringParts.push(`< ${condition.max}`);
    }
    const pointsString = stringParts.join(" ");
    const subConditions = [];
    if (pointsString) {
      subConditions.push(pointsString);
    }
    if (condition.group && condition.group.length > 0) {
      subConditions.push(
        `Игрок состоит в одной из команд: ${condition.group.join(", ")}`,
      );
      if (pointsString) {
        subConditions[0] = `(${pointsString})`;
        subConditions[1] = `(${subConditions[1]})`;
      }
    }
    return subConditions.join(" И ");
  };

  return (
    <div key={condition.blockId} className="condition-item" onClick={onClick}>
      <div className="condition-item__text-wrapper">
        <Typography.Text>{getText(condition)}</Typography.Text>
      </div>
      {condition.blockId && (
        <div className="condition-item__connected-block">
          <Typography.Text className="condition-item__connected-block-text">
            {condition.blockOrder}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default ConditionItem;
