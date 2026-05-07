import {
  type BaseEventFormData,
  createEvent,
  type CreateEventData,
  type CreateEventResponse,
  EventForm,
} from "@/entities/Event";
import { useTags } from "@/entities/Tag";
import { useNotify } from "@/shared/lib";
import { CustomModalWindow } from "@/shared/ui";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface CreateEventWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestResponse = AxiosResponse<CreateEventResponse, any, object>;

//todo fix path
const CreateEventWindow = ({ open, setIsOpen }: CreateEventWindowProps) => {
  const navigate = useNavigate();
  const notify = useNotify();

  const { data: tagOptions, refetch: refetchTags } = useTags();

  const handleFailedCreating = () => {
    notify.error({
      title: "Ошибка создания события",
      description: "Не удалось создать событие. Повторите попытку",
      placement: "top",
    });
  };

  useEffect(() => {
    if (open) {
      void refetchTags();
    }
  }, [open, refetchTags]);
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <EventForm<BaseEventFormData, RequestResponse>
        mutationFn={(data) => {
          const preparedData: CreateEventData = {
            title: data.name,
            description: data.description,
            cover: data.cover,
            tags: data.tags,
            startDate: data.startDate,
            endDate: data.endDate,
            private: data.private,
            password: data.password,
            allowDownloading: data.allowDownloading,
          };
          return createEvent(preparedData);
        }}
        tagOptions={tagOptions}
        onCoverLoadError={() => {
          notify.error({
            title: "Не удалось загрузить файл",
            description: "Произошла ошибка. Повторите попытку позже",
          });
        }}
        children={undefined}
        submitBtnText="Создать"
        onSuccessFn={(data: RequestResponse) => {
          void navigate(`/event/${data.data.eventId}`);
        }}
        onError={handleFailedCreating}
      />
    </CustomModalWindow>
  );
};

export default CreateEventWindow;
