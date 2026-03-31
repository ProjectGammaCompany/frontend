import { getFullFileUrl } from "@/src/shared/lib";
import { FileSvg, PictureSvg } from "@/src/shared/ui";
import { Typography } from "antd";
import "./FileItem.scss";

type IconType = "pic" | "default";

interface FileItemProps {
  path: string;
  name: string;
  iconType?: IconType;
}

//todo: рассмотреть перенос в shared
const FileItem = ({ path, iconType = "default", name }: FileItemProps) => {
  const icon: Record<IconType, React.ComponentType> = {
    pic: PictureSvg,
    default: FileSvg,
  };

  const IconComponent = icon[iconType];
  return (
    <li className="file-item__wrapper">
      <a
        href={getFullFileUrl(path)}
        target="_blank"
        download={name}
        className="file-item"
      >
        <div className="file-item__icon">
          <IconComponent />
        </div>
      </a>
      <Typography.Paragraph className="file-item__text">
        {name}
      </Typography.Paragraph>
    </li>
  );
};

export default FileItem;
