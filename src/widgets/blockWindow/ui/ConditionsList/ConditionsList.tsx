import {
  useConditions,
  useGroups,
  type Condition,
  type Group,
} from "@/src/entities";
import { Button } from "antd";
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

  const { data: eventGroups, isPending: isGroupsPending } = useGroups<Group[]>(
    eventId,
    (data) => data.data.groups.map((group) => group),
  );

  if (isPending || isGroupsPending) {
    return <div>Загрузка...</div>;
  }
  if (isError) {
    return <div>Ошибка!</div>;
  }

  const getClearGroups = (conditionGroups: string[], eventGroups: Group[]) => {
    const newGroups: string[] = [];
    const eventGroupsId: string[] = eventGroups.map(
      (eventGroup) => eventGroup.id,
    );
    conditionGroups.forEach((conditionGroup) => {
      if (eventGroupsId.includes(conditionGroup)) {
        newGroups.push(
          eventGroups.find((eventGroup) => eventGroup.id === conditionGroup)!
            .name,
        );
      }
    });
    return newGroups;
  };

  return (
    <div className="conditions-list__wrapper">
      <div className="conditions-list">
        {conditions.map((condition) => {
          let groups = condition.group;
          if (groups && eventGroups) {
            groups = getClearGroups(groups, eventGroups);
          }
          return (
            <ConditionItem
              key={condition.id}
              condition={{
                ...condition,
                group: groups,
              }}
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
