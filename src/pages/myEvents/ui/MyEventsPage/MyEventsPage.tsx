import { Collapse } from "antd";
import { useState, type ReactNode } from "react";
import UserEventsList from "../UserEventsList/UserEventsList";

interface ItemType {
  key: string;
  label: string;
  children: ReactNode;
}
const MyEvents = () => {
  const [key, setActiveKey] = useState<undefined | string>(undefined);

  const items: ItemType[] = [
    {
      key: "favorites",
      label: "Избранные события",
      children: (
        <UserEventsList
          listType="favorites"
          triggerLoading={key === "favorites"}
        />
      ),
    },
    {
      key: "myItems",
      label: "Мои события",
      children: (
        <UserEventsList
          listType="userEvents"
          triggerLoading={key === "myItems"}
        />
      ),
    },
    {
      key: "eventsHistory",
      label: "История прохождений",
      children: (
        <UserEventsList
          listType="eventsHistory"
          triggerLoading={key === "eventsHistory"}
        />
      ),
    },
  ];

  const handleActiveKeyChanging = (key: string[]) => {
    if (key.length) {
      setActiveKey(key[0]);
      return;
    }
    setActiveKey(undefined);
  };
  return (
    <div>
      <Collapse
        items={items}
        accordion
        activeKey={key}
        onChange={handleActiveKeyChanging}
      />
    </div>
  );
};

export default MyEvents;
