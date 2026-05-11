import { type EditorGroupStats, type EditorUserStats } from "@/entities/Event";
import { useState } from "react";
import UserInfo from "../UserInfo/UserInfo";
import UserSelect from "../UserSelect/UserSelect";

interface UserStatProps {
  groupEvent: boolean;
  eventId: string;
  groups: EditorGroupStats[] | undefined;
  users: EditorUserStats[] | undefined;
}

const SingleUserStats = ({
  eventId,
  groupEvent,
  groups,
  users,
}: UserStatProps) => {
  const [selectedUser, setSelectedUser] = useState<string>();

  return (
    <>
      <UserSelect
        selectedUser={selectedUser}
        groupEvent={groupEvent}
        groups={groups}
        users={users}
        onUserSelect={(user) => setSelectedUser(user)}
      />
      {selectedUser && <UserInfo eventId={eventId} userId={selectedUser} />}
    </>
  );
};

export default SingleUserStats;
