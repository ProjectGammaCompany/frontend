import type { EditorUserStats } from "@/entities";
import { getFullFileUrl } from "@/shared/lib";
import { ProfileSvg } from "@/shared/ui";
import { Progress, Table, Typography } from "antd";
import Column from "antd/es/table/Column";
import "./UsersStatsTable.scss";
interface UsersStatsTableProps {
  users: EditorUserStats[];
}

interface DataType {
  id: string;
  key: number;
  userPreview: UserPreview;
  points: number;
  answers: AnswersPreview;
}

interface AnswersPreview {
  correct: number;
  total: number;
}

interface UserPreview {
  username: string;
  avatar?: string;
}
const UsersStatsTable = ({ users }: UsersStatsTableProps) => {
  const getProgressColor = (value: number): string => {
    const hue = (value / 100) * 120;

    return `hsl(${hue}, 100%, 50%)`;
  };

  const mapUsersToTableData = (users: EditorUserStats[]): DataType[] => {
    return users.map((user, index) => {
      return {
        key: index,
        id: user.id,
        userPreview: {
          username: user.username,
          avatar: user.avatar,
        },
        points: user.points,
        answers: user.answers,
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
            cell: "users-stats-table__header",
          },
        }}
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
            <div className="users-stats-table__user-preview">
              {userPreview.avatar ? (
                <img
                  src={getFullFileUrl(userPreview.avatar)}
                  className="users-stats-table__avatar"
                />
              ) : (
                <div className="users-stats-table__avatar users-stats-table__avatar_icon">
                  <ProfileSvg />
                </div>
              )}
              <Typography.Text className="users-stats-table__username">
                {userPreview.username}
              </Typography.Text>
            </div>
          )}
        />
        <Column
          title="Правильных ответов на вопросы"
          dataIndex="answers"
          key="answers"
          align="center"
          render={(answers: AnswersPreview) => (
            <div className="users-stats-table__answers-preview">
              <Typography.Text>
                {answers.correct} / {answers.total},{" "}
                {Math.round((answers.correct / answers.total) * 100)}%
              </Typography.Text>
              <Progress
                size={20}
                percent={Math.round((answers.correct / answers.total) * 100)}
                type="circle"
                strokeColor={getProgressColor(
                  Math.round((answers.correct / answers.total) * 100),
                )}
                status="success"
                showInfo={false}
              />
            </div>
          )}
        />
        <Column
          title="Баллы"
          dataIndex="points"
          key="points"
          align="center"
          minWidth={100}
          sorter={(a, b) => a.points - b.points}
        />
      </Table>
    </div>
  );
};

export default UsersStatsTable;
