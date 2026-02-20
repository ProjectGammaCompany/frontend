import Icon from "@ant-design/icons";
import type { JSX } from "react";
import "./CustomIcon.scss";
interface ComponentNameProps {
  onClick?: () => void;
  component: () => JSX.Element;
  className?: string;
}

const CustomIcon = ({ onClick, component, className }: ComponentNameProps) => {
  return <Icon component={component} onClick={onClick} className={className} />;
};

export default CustomIcon;
