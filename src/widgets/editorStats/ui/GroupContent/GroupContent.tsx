import type { EditorGroupStats } from "@/entities/Event";
import { Select, Typography } from "antd";
import { useEffect, useState } from "react";
import UsersStatsTable from "../UsersStatsTable/UsersStatsTable";
import "./GroupContent.scss";
interface GroupContentProps {
  groups: EditorGroupStats[];
}

const GroupContent = ({ groups }: GroupContentProps) => {
  const [index, setIndex] = useState(groups.length > 0 ? 0 : undefined);

  const [group, setGroup] = useState(groups.length > 0 ? groups[0] : undefined);

  const getOptions = (groups: EditorGroupStats[]) => {
    return groups.map((group, index) => {
      return {
        value: index,
        label: <Typography.Text>{group.name}</Typography.Text>,
      };
    });
  };

  useEffect(() => {
    if (typeof index === "number") {
      setGroup(groups[index]);
    }
  }, [groups, index]);
  return (
    <div className="group-content">
      <div>
        <Typography.Text strong>Группа: </Typography.Text>
        <Select
          value={index}
          options={getOptions(groups)}
          onChange={(value) => {
            setIndex(value);
          }}
          classNames={{
            root: "group-content__select-group",
          }}
        />
      </div>
      <UsersStatsTable users={group?.users ?? []} />
    </div>
  );
};

export default GroupContent;
