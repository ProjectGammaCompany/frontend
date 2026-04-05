import {
  useConditions,
  useGroups,
  type Condition,
  type Group,
} from "@/entities";
import { Button, Flex, Spin, Typography } from "antd";
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
    refetch: refetchConditions,
  } = useConditions(eventId, blockId);

  const {
    data: eventGroups,
    isPending: isGroupsPending,
    isError: isGroupsError,
    refetch: refetchGroups,
  } = useGroups<Group[]>(eventId, (data) =>
    data.data.groups.map((group) => group),
  );

  if (isPending || isGroupsPending) {
    return (
      <Flex justify="center">
        <Spin />
      </Flex>
    );
  }
  if (isError || isGroupsError) {
    return (
      <Flex vertical justify="center" align="center">
        <Typography.Paragraph type="danger">
          Произошла ошибка. Повторите попытку
        </Typography.Paragraph>
        <Button
          onClick={() => {
            if (isError) {
              void refetchConditions();
              return;
            }
            void refetchGroups();
          }}
        >
          Обновить
        </Button>
      </Flex>
    );
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
