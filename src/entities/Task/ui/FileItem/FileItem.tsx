import { getFullFileUrl } from "@/src/shared/lib";
import { Typography } from "antd";
import "./FileItem.scss";
interface FileItemProps {
  path: string;
}

//todo: рассмотреть перенос в shared
const FileItem = ({ path }: FileItemProps) => {
  return (
    <li className="file-item__wrapper">
      <a
        href={getFullFileUrl(path)}
        target="_blank"
        download={path}
        className="file-item"
      >
        <div className="file-item__icon">Иконка</div>
        <Typography.Paragraph>{path}</Typography.Paragraph>
      </a>
    </li>
  );
};

export default FileItem;
