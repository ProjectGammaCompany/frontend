import { FileSvg, PictureSvg } from "@/shared/ui/svg";
import { Typography } from "antd";
import "./FileItem.scss";

type IconType = "pic" | "default";

interface FileItemProps {
  name: string;
  iconType?: IconType;
  onClick?: () => void;
}

const FileItem = ({ onClick, iconType = "default", name }: FileItemProps) => {
  const icon: Record<IconType, React.ComponentType> = {
    pic: PictureSvg,
    default: FileSvg,
  };

  const IconComponent = icon[iconType];
  return (
    <li className="file-item__wrapper">
      <div onClick={onClick} className="file-item">
        <div className="file-item__icon">
          <IconComponent />
        </div>
      </div>
      <Typography.Paragraph className="file-item__text">
        {name}
      </Typography.Paragraph>
    </li>
  );
};

export default FileItem;
