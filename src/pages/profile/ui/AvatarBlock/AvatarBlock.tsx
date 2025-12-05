import { queryClient } from "@/src/shared/api";
import { getFullFileUrl, useFileUpload } from "@/src/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { Button, Upload } from "antd";
import type { AxiosResponse } from "axios";
import type { GetProfileResponse } from "../../api/getProfile";
import { setAvatar } from "../../api/setAvatar";
import "./AvatarBlock.scss";

interface AvatarBlockProps {
  avatar: string;
}

const AvatarBlock = ({ avatar }: AvatarBlockProps) => {
  console.log(avatar);
  const setAvatarMutation = useMutation({
    mutationKey: ["avatar"],
    mutationFn: setAvatar,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["profile"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (oldData: AxiosResponse<GetProfileResponse, any, object>) => {
          return oldData
            ? {
                ...oldData,
                data: {
                  ...oldData.data,
                  avatar: variables,
                },
              }
            : oldData;
        },
      );
    },
  });

  const uploadAvatarMutation = useFileUpload({
    onSuccess: (data) => {
      setAvatarMutation.mutate(data.data.url);
    },
  });

  const handleAvatarUpload = (avatar: File) => {
    uploadAvatarMutation.mutate(avatar);
    return false;
  };

  return (
    <div className="profile-page__avatar-block">
      <img
        src={getFullFileUrl(avatar)}
        alt="avatar"
        className="profile-page__avatar-img"
      />
      <Upload
        showUploadList={false}
        beforeUpload={handleAvatarUpload}
        maxCount={1}
        onPreview={() => null}
        accept="image/*"
      >
        <Button>Обновить</Button>
      </Upload>
    </div>
  );
};

export default AvatarBlock;
