import {
  deleteEvent,
  editEventSettings,
  EventForm,
  getEditingEventSettings,
  selectEventName,
  setName,
  type BaseEventFormData,
  type ClientGroup,
  type EditEventSettingsResponse,
  type EditingEventSettings,
} from "@/src/entities";
import { CustomModalWindow, CustomSwitch, TrashSvg } from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form } from "antd";
import type { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { mapServerGroupToClientGroup } from "../../model/mapServerGroupToClientGroup";
import { updateGroupsInQuery } from "../../model/updateGroupsInQuery";
import { GroupsSettings } from "../GroupsSettings/GroupsSettings";
import "./EditEventSettingsWindow.scss";
interface EditEventWindowProps {
  eventId: string;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export type FullFormData = BaseEventFormData & {
  groupEvent: boolean;
  groups: ClientGroup[];
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

  const [showSuccessText, setShowSuccessText] = useState(false);

  const [groupEvent, setGroupEvent] = useState(false);

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
      groups: mapServerGroupToClientGroup(data.groups),
    };
    return transformedData;
  };

  const deleteEventMutation = useMutation({
    mutationFn: () => deleteEvent(eventId),
    onSuccess: () => {
      void navigate("/");
    },
  });

  useEffect(() => {
    if (data?.groupEvent) {
      setGroupEvent(data.groupEvent);
    }
  }, [data]);

  return (
    <>
      <CustomModalWindow open={open} setIsOpen={setIsOpen}>
        <Button
          className="edit-event-settings-window__delete-btn"
          onClick={() => deleteEventMutation.mutate()}
        >
          <TrashSvg />
        </Button>
        <div className="edit-event-settings-window__form-wrapper">
          <EventForm<FullFormData, AxiosResponse<EditEventSettingsResponse>>
            submitBtnText="Применить"
            onSuccessText="Настройки обновлены"
            showSuccessText={showSuccessText}
            mutationFn={(data) => editEventSettings(eventId, data)}
            onSuccessFn={(response, variables) => {
              dispatch(setName(variables.title));
              updateGroupsInQuery(eventId, response.data.groups);
              setShowSuccessText(true);
              setTimeout(() => {
                setShowSuccessText(false);
              }, 3000);
            }}
            defaultData={mapServerDataToFormData(data)}
          >
            <Form.Item<EditingEventSettings>
              name="groupEvent"
              className="edit-event-settings-window__form-item"
            >
              <CustomSwitch
                title="Групповое событие"
                value={groupEvent}
                onChange={(checked) => setGroupEvent(checked)}
              />
            </Form.Item>
            <Form.Item noStyle={!groupEvent}>
              <Form.Item<EditingEventSettings> noStyle name="groups" />
              {groupEvent && <GroupsSettings />}
            </Form.Item>
          </EventForm>
        </div>
      </CustomModalWindow>
    </>
  );
};

export default EditEventSettingsWindow;
