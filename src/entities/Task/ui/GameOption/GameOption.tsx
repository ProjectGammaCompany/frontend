import { Checkbox, ConfigProvider, Typography } from "antd";
import classnames from "classnames";
import "./GameOption.scss";
interface GameOptionProps {
  id: string;
  value: string;
  clickFn?: (id: string, value: boolean) => void;
  selected: boolean;
  className?: string;
  disabled: boolean;
}

const GameOption = ({
  id,
  value,
  clickFn,
  selected,
  className,
  disabled,
}: GameOptionProps) => {
  const classNames = classnames("game-option__wrapper", className);

  return (
    <li className={classNames}>
      <ConfigProvider
        theme={{
          token: {
            controlInteractiveSize: 45,
          },
        }}
      >
        <Checkbox
          disabled={disabled}
          checked={selected}
          onChange={({ target }) => clickFn?.(id, target.checked)}
          classNames={{
            root: "game-option",
            icon: "game-option__icon",
          }}
        />
      </ConfigProvider>
      <Typography.Text>{value}</Typography.Text>
    </li>
  );
};

export default GameOption;
