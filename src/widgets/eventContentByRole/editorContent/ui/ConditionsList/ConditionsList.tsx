interface ConditionsListProps {
  eventId: string;
  blockId: string;
}

const ConditionsList = (props: ConditionsListProps) => {
  console.log(props);
  return <div>Условия</div>;
};

export default ConditionsList;
