import type { GroupStats } from "@/entities";
import { getFullFileUrl } from "@/shared/lib";
import { ProfileSvg } from "@/shared/ui";
import { Table, Typography } from "antd";
import Column from "antd/es/table/Column";
import { getImgUrl } from "../../../../shared/lib/workWithFiles/getImgUrl";
import "./GroupStatsTable.scss";
interface GroupsStatsTableProps {
  groups: GroupStats[];
}

interface DataType {
  key: string;
  userIndex: number;
  groupIndex: number;
  groupName: string;
  userPreview: UserPreview;
  points: number;
  current: boolean;
  groupSize: number;
}

interface UserPreview {
  userName: string;
  avatar: string | undefined;
}

const GroupsStatsTable = ({ groups }: GroupsStatsTableProps) => {
  const mapGroupsToTableData = (groups: GroupStats[]): DataType[] => {
    return groups.flatMap((group, groupIndex) =>
      group.users.map((user, userIndex) => ({
        key: `${group.id}-${user.id}`,
        userIndex,
        groupIndex,
        current: user.current,
        groupName: group.name,
        userPreview: {
          userName: user.username,
          avatar: user.avatar,
        },
        points: user.points,
        groupSize: group.users.length,
      })),
    );
  };

  const mappedGroups = mapGroupsToTableData(groups);
  return (
    <Table<DataType>
      dataSource={mappedGroups}
      scroll={{
        x: "max-content",
      }}
      bordered
      pagination={false}
    >
      <Column
        align="center"
        title="Группа"
        dataIndex="groupName"
        key="groupName"
        minWidth={100}
        onCell={(record: DataType) => ({
          rowSpan: record.userIndex === 0 ? record.groupSize : 0,
        })}
      />
      <Column
        fixed
        align="center"
        title="Место в группе"
        dataIndex="userIndex"
        key="userIndex"
        render={(value: number) => value + 1}
        onCell={(record: DataType) => ({
          className: record.current
            ? "group-stats-table__current-user-cell"
            : "",
        })}
      />
      <Column
        title="Участник"
        align="center"
        dataIndex="userPreview"
        key="userPreview"
        onCell={(record: DataType) => ({
          className: record.current
            ? "group-stats-table__current-user-cell"
            : "",
        })}
        render={(record: UserPreview) => (
          <div className="group-stats-table__user-preview">
            {record.avatar ? (
              <img
                src={getFullFileUrl(getImgUrl(record.avatar, "m"))}
                className="group-stats-table__avatar"
              />
            ) : (
              <div className="roup-stats-table__avatar roup-stats-table__avatar_icon">
                <ProfileSvg />
              </div>
            )}
            <Typography.Text className="group-stats-table__username">
              {record.userName}
            </Typography.Text>
          </div>
        )}
      />
      <Column
        title="Баллы"
        dataIndex="points"
        key="points"
        align="center"
        onCell={(record: DataType) => ({
          className: record.current
            ? "group-stats-table__current-user-cell"
            : "",
        })}
      />
    </Table>
  );
};

export default GroupsStatsTable;
