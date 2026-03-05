import {
  ConditionForm,
  createCondition,
  updateCondition,
  useUpdateGroups,
  type Condition,
  type CreateConditionResponse,
  type UpdateConditionResponse,
} from "@/src/entities";
import { DeleteConditionButton } from "@/src/features";
import { CustomModalWindow } from "@/src/shared/ui";
import { Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import { addConditionToList } from "../model/addConditionToList";
import { removeConditionFromList } from "../model/removeConditionFromList";
import { updateConditionInQuery } from "../model/updateConditionInQuery";
import { updateGroupsInConditionsQuery } from "../model/updateGroupsInConditionsQuery";
import "./ConditionWindow.scss";

export type ConditionWindowMode = "create" | "edit";
interface ConditionWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  eventId: string;
  blockId: string;
}

type CreateConditionWindow = ConditionWindowProps & {
  mode: Extract<ConditionWindowMode, "create">;
};

type EditConditionWindow = ConditionWindowProps & {
  mode: Extract<ConditionWindowMode, "edit">;
  editData: {
    condition: Condition;
    updateConditionGroups: (groups: string[]) => void;
  };
};

const ConditionWindow = (
  props: CreateConditionWindow | EditConditionWindow,
) => {
  const { mode, open, setIsOpen, eventId, blockId } = props;

  const [groupsSelectLoading, setGroupsSelectLoading] = useState(false);

  const [groupsSelectingError, setGroupsSelectingError] = useState(false);

  const condition = mode === "edit" ? props.editData.condition : undefined;

  const updateConditionGroups =
    mode === "edit" ? props.editData.updateConditionGroups : undefined;

  const handleSuccessDelete = () => {
    if (condition) {
      removeConditionFromList(eventId, blockId, condition?.id);
      setIsOpen(false);
    }
  };

  const handleSuccessUpdate = (id: string, groups: string[]) => {
    if (mode === "edit") {
      updateConditionGroups?.(groups);
      updateGroupsInConditionsQuery(eventId, blockId, id, groups);
      setGroupsSelectLoading(false);
    }
  };

  const handleErrorUpdate = () => {
    setGroupsSelectingError(true);
    setGroupsSelectLoading(false);
  };

  const updateGroupsMutation = useUpdateGroups(
    eventId,
    blockId,
    condition ? condition.id : "",
    handleSuccessUpdate,
    handleErrorUpdate,
  );

  const handleHangingGroups = (fixedGroups: string[]) => {
    setGroupsSelectLoading(true);
    updateGroupsMutation.mutate(fixedGroups);
  };

  const handleClose = () => {
    setGroupsSelectLoading(false);
    setGroupsSelectingError(false);
  };

  return (
    <CustomModalWindow
      open={open}
      setIsOpen={setIsOpen}
      afterClose={handleClose}
    >
      <div className="condition-window__header">
        {condition && (
          <DeleteConditionButton
            eventId={eventId}
            blockId={blockId}
            conditionId={condition.id}
            onSuccess={handleSuccessDelete}
          />
        )}
        <Typography.Title level={3} className="condition-window__header-title">
          Условие
        </Typography.Title>
      </div>
      <div className="condition-window__body">
        {condition ? (
          <ConditionForm<AxiosResponse<UpdateConditionResponse>>
            eventId={eventId}
            mutationFn={(data) =>
              updateCondition(eventId, blockId, condition.id, data)
            }
            onSuccessFn={(response, variables) => {
              updateConditionInQuery(eventId, blockId, {
                ...variables,
                id: condition.id,
                blockOrder: response.data.blockOrder,
              });
            }}
            onHangingGroups={handleHangingGroups}
            submitBtnText="Сохранить"
            initialData={condition}
            groupsLoaded={groupsSelectLoading}
            groupsError={groupsSelectingError}
          />
        ) : (
          <ConditionForm<AxiosResponse<CreateConditionResponse>>
            eventId={eventId}
            mutationFn={(data) => createCondition(eventId, blockId, data)}
            submitBtnText="Создать"
            onSuccessFn={(response, variables) => {
              addConditionToList(
                eventId,
                blockId,
                variables,
                response.data.conditionId,
                response.data.blockOrder,
              );
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </CustomModalWindow>
  );
};

export default ConditionWindow;
