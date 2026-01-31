import {
  deleteEvent,
  editEventSettings,
  EventForm,
  getEditingEventSettings,
  selectEventName,
  setName,
  type BaseEventFormData,
  type EditingEventSettings,
  type Group,
} from "@/src/entities";
import { CustomModalWindow, TrashSvg } from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import type { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./EditEventSettingsWindow.scss";
interface EditEventWindowProps {
  eventId: string;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

type FullFormData = BaseEventFormData & {
  groups: Group[];
  collaborators: string[];
};

type FullSettingsData = EditingEventSettings & {
  title: string;
};
const EditEventSettingsWindow = ({
  eventId,
  open,
  setIsOpen,
}: EditEventWindowProps) => {
  const title = useSelector(selectEventName);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [eventId, "settings"],
    queryFn: () => getEditingEventSettings(eventId),
    select: (data) => {
      return { ...data.data, title };
    },
  });

  const dispatch = useDispatch();

  const mapServerDataToFormData = (data?: FullSettingsData) => {
    if (!data) {
      return undefined;
    }

    const transformedData: FullFormData = {
      ...data,
      startDate: data.startDate
        ? dayjs(data.startDate, "DD.MM.YYYY HH:mm:ss.SSS")
        : undefined,
      endDate: data.endDate
        ? dayjs(data.endDate, "DD.MM.YYYY HH:mm:ss.SSS")
        : undefined,
    };
    return transformedData;
  };

  const deleteEventMutation = useMutation({
    mutationFn: () => deleteEvent(eventId),
    onSuccess: () => {
      void navigate("/");
    },
  });
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <Button
        className="edit-event-settings-window__delete-btn"
        onClick={() => deleteEventMutation.mutate()}
      >
        <TrashSvg />
      </Button>
      <div className="edit-event-settings-window__form-wrapper">
        <EventForm<FullFormData, AxiosResponse<unknown>>
          submitBtnText="Применить"
          mutationFn={(data) => editEventSettings(eventId, data)}
          onSuccessFn={(_, variables) => {
            dispatch(setName(variables.title));
            setIsOpen(false);
          }}
          defaultData={mapServerDataToFormData(data)}
        >
          {/* <Form.Item>
          <Form.Item<EditingEventSettings> noStyle name="collaborators">
          <div />
          </Form.Item>
          <div>{}</div>
          </Form.Item> */}
        </EventForm>
      </div>
    </CustomModalWindow>
  );
};

export default EditEventSettingsWindow;
