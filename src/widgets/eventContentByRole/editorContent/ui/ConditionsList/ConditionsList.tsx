import { getConditions } from "@/src/entities";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setCondition } from "../../model/conditionSlice";
import ConditionItem from "../ConditionItem/ConditionItem";
import "./ConditionsList.scss";
interface ConditionsListProps {
  eventId: string;
  blockId: string;
  setConditionWindowOpen: (value: boolean) => void;
}

const ConditionsList = ({
  eventId,
  blockId,
  setConditionWindowOpen,
}: ConditionsListProps) => {
  const {
    data: conditions,
    isPending,
    isError,
  } = useQuery({
    queryKey: [eventId, blockId, "conditionsList"],
    queryFn: () => getConditions(eventId, blockId),
    select: (data) => data.data.conditions,
  });

  const dispatch = useDispatch();

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
              onClick={() => {
                dispatch(setCondition(condition));
                setConditionWindowOpen(true);
              }}
            />
          );
        })}
      </div>
      <Button
        onClick={() => {
          dispatch(setCondition(null));
          setConditionWindowOpen(true);
        }}
      >
        Добавить условие
      </Button>
    </div>
  );
};

export default ConditionsList;
