import type { ClientGroup } from "@/src/entities";
import { Button, Form } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FullFormData } from "../EditEventSettingsWindow/EditEventSettingsWindow";
import { GroupItem } from "../GroupItem/GroupItem";
import "./GroupSettings.scss";

export const GroupsSettings = () => {
  const form = Form.useFormInstance<FullFormData>();

  const groups = useWatch("groups", form);

  const handleGroupItemChange = (
    index: number,
    login: string,
    password: string,
  ) => {
    const newArray = groups.map((group, i) => {
      if (i === index) {
        return {
          ...group,
          login,
          password,
        };
      }
      return group;
    });

    form.setFieldValue("groups", newArray);
  };

  const handleGroupAdd = () => {
    const newGroup: ClientGroup = {
      clientId: uuidv4(),
      login: "",
      password: "",
    };
    form.setFieldValue("groups", [...groups, newGroup]);
  };

  useEffect(() => {
    console.log(groups);
  }, [groups]);
  return (
    <Form.Item>
      <div className="group-settings">
        <ul className="group-settings__list">
          {groups?.map((group, index) => (
            <GroupItem
              key={group.clientId}
              group={group}
              onChange={(login, password) =>
                handleGroupItemChange(index, login, password)
              }
            />
          ))}
        </ul>
        <Button onClick={handleGroupAdd}>Добавить группу</Button>
      </div>
    </Form.Item>
  );
};
