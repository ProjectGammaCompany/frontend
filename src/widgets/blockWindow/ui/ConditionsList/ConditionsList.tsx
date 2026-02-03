import { type Condition } from "@/src/entities";
import { Button } from "antd";
import { useConditions } from "../../model/useConditions";
import ConditionItem from "../ConditionItem/ConditionItem";
import "./ConditionsList.scss";
interface ConditionsListProps {
  eventId: string;
  blockId: string;
  onConditionClick: (condition: Condition) => void;
  onCreateConditionBtnClick: () => void;
}

const ConditionsList = ({
  eventId,
  blockId,
  onConditionClick,
  onCreateConditionBtnClick,
}: ConditionsListProps) => {
  const {
    data: conditions,
    isPending,
    isError,
  } = useConditions(eventId, blockId);

  if (isPending) {
    return <div>Загрузка...</div>;
  }
  if (isError) {
    return <div>Ошибка!</div>;
  }
  return (
    <div className="conditions-list__wrapper">
      <div className="conditions-list">
        {conditions.map((condition) => {
          return (
            <ConditionItem
              key={condition.id}
              condition={condition}
              onClick={() => onConditionClick(condition)}
            />
          );
        })}
      </div>
      <Button onClick={onCreateConditionBtnClick}>Добавить условие</Button>
    </div>
  );
};

export default ConditionsList;
