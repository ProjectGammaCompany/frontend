import type { UserStats } from "@/entities/Event";
import { getFullFileUrl, getImgUrl } from "@/shared/lib/workWithFiles";
import { ProfileSvg } from "@/shared/ui/svg";
import { Table, Typography } from "antd";
import Column from "antd/es/table/Column";
import "./UserStatsTable.scss";
interface UserStatsTableProps {
  users: UserStats[];
}

interface DataType {
  key: number;
  current: boolean;
  userPreview: UserPreview;
  points: number;
}

interface UserPreview {
  userName: string;
  avatar: string | undefined;
}

const UserStatsTable = ({ users }: UserStatsTableProps) => {
  const mapUsersToTableData = (users: UserStats[]): DataType[] => {
    return users.map((user, index) => {
      return {
        key: index,
        current: user.current,
        userPreview: {
          userName: user.username,
          avatar: user.avatar,
        },
        points: user.points,
      };
    });
  };

  const mappedData = mapUsersToTableData(users);
  return (
    <div>
      <Table<DataType>
        dataSource={mappedData}
        pagination={false}
        bordered
        classNames={{
          header: {
            cell: "user-stats-table__header",
          },
        }}
        rowClassName={(record: DataType) =>
          record.current ? "user-stats-table__current-user-row" : ""
        }
      >
        <Column
          align="center"
          title="Место"
          dataIndex="key"
          key="key"
          render={(place: number) => place + 1}
          sorter={(a, b) => a.key - b.key}
          minWidth={100}
        />
        <Column
          title="Участник"
          align="center"
          dataIndex="userPreview"
          key="userPreview"
          render={(userPreview: UserPreview) => (
            <div className="user-stats-table__user-preview">
              {userPreview.avatar ? (
                <img
                  src={getFullFileUrl(getImgUrl(userPreview.avatar, "m"))}
                  className="user-stats-table__avatar"
                />
              ) : (
                <div className="user-stats-table__avatar user-stats-table__avatar_icon">
                  <ProfileSvg />
                </div>
              )}
              <Typography.Text className="user-stats-table__username">
                {userPreview.userName}
              </Typography.Text>
            </div>
          )}
        />
        <Column title="Баллы" dataIndex="points" key="points" align="center" />
      </Table>
    </div>
  );
};

export default UserStatsTable;
