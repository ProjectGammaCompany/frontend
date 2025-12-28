import {
  editEventSettings,
  EventForm,
  getEditingEventSettings,
  selectEventName,
  setName,
  type BaseEventFormData,
  type EditingEventSettings,
  type Group,
} from "@/src/entities";
import { CustomModalWindow } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

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
        ? dayjs(data.startDate, {
            format: "DD.MM.YYYY HH:mm",
          })
        : undefined,
      endDate: data.endDate
        ? dayjs(data.endDate, {
            format: "DD.MM.YYYY HH:mm",
          })
        : undefined,
    };
    return transformedData;
  };
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
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
    </CustomModalWindow>
  );
};

export default EditEventSettingsWindow;
