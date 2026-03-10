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
import { Button, Form, Input } from "antd";
import type { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { mapServerGroupToClientGroup } from "../../model/mapServerGroupToClientGroup";
import { updateSettingsInQuery } from "../../model/updateSettingsInQuery";
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
  rating: boolean;
  collaborators: string[];
};

type FullSettingsData = EditingEventSettings & {
  name: string;
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
      return mapServerDataToFormData({ ...data.data, name: title });
    },
  });

  const [showSuccessText, setShowSuccessText] = useState(false);

  const [groupEvent, setGroupEvent] = useState(false);

  const dispatch = useDispatch();

  const mapServerDataToFormData = (data?: FullSettingsData) => {
    if (!data) {
      return undefined;
    }

    const transformedData: FullFormData & { joinCode?: string } = {
      ...data,
      startDate: data.startDate
        ? dayjs(data.startDate, "DD.MM.YYYY HH:mm")
        : undefined,
      endDate: data.endDate
        ? dayjs(data.endDate, "DD.MM.YYYY HH:mm")
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
            joinCode={data?.joinCode}
            mutationFn={(data) => editEventSettings(eventId, data)}
            onSuccessFn={(response, variables) => {
              const newData = {
                ...variables,
                groups: response.data.groups,
              };
              dispatch(setName(variables.name));
              updateSettingsInQuery(eventId, newData);
              setShowSuccessText(true);
              setTimeout(() => {
                setShowSuccessText(false);
              }, 3000);
            }}
            defaultData={data}
          >
            <Form.Item<EditingEventSettings>
              name="rating"
              className="edit-event-settings-window__form-item"
            >
              <CustomSwitch title="Показывать общую таблицу" />
            </Form.Item>
            <Form.List name="collaborators">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Form.Item key={field.key} shouldUpdate noStyle>
                      {({ getFieldValue }) => (
                        <Form.Item className="edit-event-settings-window__collaborator-item">
                          <Form.Item
                            noStyle
                            name={field.name}
                            dependencies={["collaborators"]}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                validator(_, value) {
                                  if (!value) return Promise.resolve();
                                  const list = (getFieldValue(
                                    "collaborators",
                                  ) ?? []) as string[];
                                  const duplicates = list.filter(
                                    (v) => v === value,
                                  );
                                  if (duplicates.length > 1) {
                                    return Promise.reject(
                                      new Error("Такая почта уже добавлена"),
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <Input
                              className="edit-event-settings-window__collaborator-input"
                              type="email"
                              placeholder="Введите почту соорганизатора"
                            />
                          </Form.Item>
                          <Button onClick={() => remove(field.name)}>
                            Удалить
                          </Button>
                        </Form.Item>
                      )}
                    </Form.Item>
                  ))}
                  <Button onClick={() => add()}>Добавить соорганизатора</Button>
                </>
              )}
            </Form.List>
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
