import {
  createEvent,
  EventForm,
  type BaseEventFormData,
  type CreateEventData,
  type CreateEventResponse,
} from "@/src/entities";
import { CustomModalWindow } from "@/src/shared/ui";
import type { AxiosResponse } from "axios";
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
        children={undefined}
        submitBtnText="Создать"
        onSuccessFn={(data: RequestResponse) => {
          void navigate(`event/${data.data.eventId}`);
        }}
      />
    </CustomModalWindow>
  );
};

export default CreateEventWindow;
