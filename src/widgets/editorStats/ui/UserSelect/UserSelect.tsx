import type { EditorGroupStats, EditorUserStats } from "@/entities/Event";
import type { SelectOptionType } from "@/shared/model/types";
import { Select } from "antd";
import { useState } from "react";
import "./UserSelect.scss";
interface UserSelectProps {
  groupEvent: boolean;
  groups: EditorGroupStats[] | undefined;
  users: EditorUserStats[] | undefined;
  selectedUser: string | undefined;
  onUserSelect: (user: string | undefined) => void;
}

const UserSelect = ({
  groupEvent,
  groups,
  users,
  selectedUser,
  onUserSelect,
}: UserSelectProps) => {
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const getUserOptionsFromGroup = (
    groups: EditorGroupStats[],
  ): Record<string, SelectOptionType[]> => {
    const userMap: Record<string, SelectOptionType[]> = {};

    groups.forEach((group) => {
      userMap[group.id] = group.users.map((user) => {
        return {
          value: user.id,
          label: user.username,
        };
      });
    });
    return userMap;
  };

  const groupOptions: SelectOptionType[] | undefined = groupEvent
    ? groups?.map((group) => {
        return { value: group.id, label: group.name };
      })
    : undefined;

  const groupUserOptions: Record<string, SelectOptionType[]> | undefined =
    groupEvent && groups ? getUserOptionsFromGroup(groups) : undefined;

  const userOptions: SelectOptionType[] | undefined =
    !groupEvent && users
      ? users.map((user) => {
          return {
            label: user.username,
            value: user.id,
          };
        })
      : undefined;
  return (
    <div className="user-select">
      {groupEvent && (
        <Select
          options={groupOptions}
          onSelect={(val: string) => {
            setSelectedGroup(val);
            onUserSelect(undefined);
          }}
          placeholder="Выберите группу"
          popupMatchSelectWidth={false}
          classNames={{
            root: "user-select__select",
            content: "user-select__select-content",
          }}
        />
      )}
      {(!groupEvent || (groupEvent && selectedGroup)) && (
        <Select
          options={
            groupEvent ? groupUserOptions?.[selectedGroup!] : userOptions
          }
          value={selectedUser}
          popupMatchSelectWidth={false}
          showSearch={{ optionFilterProp: "label" }}
          onSelect={(val: string) => onUserSelect(val)}
          placeholder="Выберите участника события"
          classNames={{
            root: "user-select__select",
            content: "user-select__select-content",
          }}
        />
      )}
    </div>
  );
};

export default UserSelect;
