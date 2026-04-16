import { Switch, Typography } from "antd";
import type { SwitchChangeEventHandler } from "antd/es/switch";
import type React from "react";
import type { ReactNode } from "react";
import "./CustomSwitch.scss";
interface CustomSwitchProps {
  value?: boolean;
  title?: string;
  onChange?: SwitchChangeEventHandler | undefined;
  checked?: boolean;
  titleNode?: ReactNode;
  disabled?: boolean;
}

const CustomSwitch = ({
  value,
  onChange,
  ref,
  title,
  disabled,
  titleNode,
  checked,
  ...rest
}: CustomSwitchProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
  ref?: React.RefObject<any | null>;
}) => {
  return (
    <label className="switch__wrapper">
      <Switch
        checked={checked}
        value={value}
        disabled={disabled}
        ref={ref}
        onChange={onChange}
        {...rest}
        className="switch"
      />
      {titleNode && titleNode}
      {title && <Typography.Text>{title}</Typography.Text>}
    </label>
  );
};

export default CustomSwitch;
