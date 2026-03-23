import { Checkbox, ConfigProvider, Typography } from "antd";
import classnames from "classnames";
import "./Option.scss";
interface OptionProps {
  id: string;
  value: string;
  clickFn: (id: string, value: boolean) => void;
  selected: boolean;
  className?: string;
  disabled: boolean;
}

const Option = ({
  id,
  value,
  clickFn,
  selected,
  className,
  disabled,
}: OptionProps) => {
  const classNames = classnames("option__wrapper", className);

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
          onChange={({ target }) => clickFn(id, target.checked)}
          classNames={{
            root: "option",
            icon: "option__icon",
          }}
        />
      </ConfigProvider>
      <Typography.Text>{value}</Typography.Text>
    </li>
  );
};

export default Option;
