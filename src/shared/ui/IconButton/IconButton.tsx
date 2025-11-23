import { Button } from "antd";
import classNames from "classNames";
import type { ReactNode } from "react";
import "./IconButton.scss";
interface FooterButtonProps {
  icon: ReactNode;
  onClick?: (React.MouseEventHandler<HTMLElement> | undefined) | (() => void);
  className?: string;
  iconWrapperClassname?: string;
}

const IconButton = ({
  icon,
  onClick,
  className,
  iconWrapperClassname,
}: FooterButtonProps) => {
  const classnames = classNames("icon-btn", className);
  return (
    <Button onClick={onClick} className={classnames}>
      <div
        className={classNames("icon-btn__icon-wrapper", iconWrapperClassname)}
      >
        {icon}
      </div>
    </Button>
  );
};

export default IconButton;
