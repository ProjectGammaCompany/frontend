import type { ClientGroup } from "@/src/entities";
import { useDebounce } from "@/src/shared/lib";
import { Input } from "antd";
import Password from "antd/es/input/Password";
import { useEffect, useState } from "react";

interface GroupItemProps {
  group: ClientGroup;
  onChange?: (login: string, password: string) => void;
}
export const GroupItem = ({ group, onChange }: GroupItemProps) => {
  const [login, setLogin] = useState(group.login);

  const [password, setPassword] = useState(group.password);

  const loginDebounce = useDebounce(login, 1500);

  const passwordDebounce = useDebounce(password, 1500);

  useEffect(() => {
    onChange?.(loginDebounce, passwordDebounce);
  }, [loginDebounce, onChange, passwordDebounce]);

  return (
    <li>
      <Input
        placeholder="Введите название группы"
        value={login}
        onChange={(e) => setLogin(e.currentTarget.value)}
      />
      <Password
        value={password}
        placeholder="Введите пароль для группы"
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
    </li>
  );
};
