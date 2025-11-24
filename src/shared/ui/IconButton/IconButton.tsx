import { Button } from "antd";
import classnames from "classnames";
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
  const classNames = classnames("icon-btn", className);
  return (
    <Button onClick={onClick} className={classNames}>
      <div
        className={classnames("icon-btn__icon-wrapper", iconWrapperClassname)}
      >
        {icon}
      </div>
    </Button>
  );
};

export default IconButton;
