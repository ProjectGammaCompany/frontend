import type { ClientGroup } from "@/entities";
import { useDebounce } from "@/shared/lib";
import { IconButton, TrashSvg } from "@/shared/ui";
import { Input } from "antd";
import Password from "antd/es/input/Password";
import { useEffect, useState } from "react";
import "./GroupItem.scss";
interface GroupItemProps {
  group: ClientGroup;
  onChange?: (login: string, password: string) => void;
  onDelete?: () => void;
}
export const GroupItem = ({ group, onChange, onDelete }: GroupItemProps) => {
  const [login, setLogin] = useState(group.login);

  const [password, setPassword] = useState(group.password);

  const loginDebounce = useDebounce(login, 1500);

  const passwordDebounce = useDebounce(password, 1500);

  useEffect(() => {
    onChange?.(loginDebounce, passwordDebounce);
  }, [loginDebounce, onChange, passwordDebounce]);

  return (
    <li className="group-item">
      <div>
        <Input
          placeholder="Введите название группы"
          value={login}
          required
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <Password
          value={password}
          placeholder="Введите пароль для группы"
          required
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <IconButton
        icon={<TrashSvg />}
        onClick={() => onDelete?.()}
        className="group-item__delete-btn"
      />
    </li>
  );
};
