import { Button, ConfigProvider } from "antd";
import classnames from "classnames";
import type { ReactNode } from "react";
import "./IconButton.scss";
interface FooterButtonProps {
  icon: ReactNode;
  onClick?: (React.MouseEventHandler<HTMLElement> | undefined) | (() => void);
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  iconWrapperClassname?: string;
}

const IconButton = ({
  icon,
  onClick,
  className,
  loading,
  disabled,
  iconWrapperClassname,
}: FooterButtonProps) => {
  const classNames = classnames("icon-btn", className);
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadius: 10,
          },
        },
      }}
    >
      <Button
        onClick={onClick}
        className={classNames}
        loading={loading}
        disabled={disabled}
      >
        {!loading && (
          <div
            className={classnames(
              "icon-btn__icon-wrapper",
              iconWrapperClassname,
            )}
          >
            {icon}
          </div>
        )}
      </Button>
    </ConfigProvider>
  );
};

export default IconButton;
