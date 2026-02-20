import {
  createEvent,
  EventForm,
  type BaseEventFormData,
  type createEventResponse,
} from "@/src/entities";
import { CustomModalWindow } from "@/src/shared/ui";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

interface CreateEventWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestResponse = AxiosResponse<createEventResponse, any, object>;

//todo fix path
const CreateEventWindow = ({ open, setIsOpen }: CreateEventWindowProps) => {
  const navigate = useNavigate();
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <EventForm<BaseEventFormData, RequestResponse>
        mutationFn={createEvent}
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
