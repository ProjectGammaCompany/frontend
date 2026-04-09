import { getFullFileUrl, useFileUpload } from "@/shared/lib";
import { ProfileSvg } from "@/shared/ui";
import { Button, Upload } from "antd";
import { useSetAvatar } from "../../model/useSetAvatar";
import "./AvatarBlock.scss";

interface AvatarBlockProps {
  avatar: string;
}

const AvatarBlock = ({ avatar }: AvatarBlockProps) => {
  const setAvatarMutation = useSetAvatar();

  const uploadAvatarMutation = useFileUpload((data) => {
    setAvatarMutation.mutate(data.data);
  });

  const handleAvatarUpload = (avatar: File) => {
    uploadAvatarMutation.mutate(avatar);
    return false;
  };

  return (
    <div className="profile-page__avatar-block">
      {avatar ? (
        <img
          src={getFullFileUrl(avatar)}
          alt="avatar"
          className="profile-page__avatar-img"
        />
      ) : (
        <div className="profile-page__avatar-icon-wrapper">
          <ProfileSvg />
        </div>
      )}
      <Upload
        showUploadList={false}
        beforeUpload={handleAvatarUpload}
        maxCount={1}
        onPreview={() => null}
        accept="image/*"
        className="profile-page__upload"
      >
        <Button>Обновить</Button>
      </Upload>
    </div>
  );
};

export default AvatarBlock;
