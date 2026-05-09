import type { Condition } from "@/entities/Block";
import {
  ConditionForm,
  createCondition,
  updateCondition,
  useUpdateGroups,
  type CreateConditionResponse,
  type UpdateConditionResponse,
} from "@/entities/Condition";
import {
  useBlockOptions,
  useGroups,
  type UseGroupsQueryData,
} from "@/entities/Event";
import { DeleteConditionButton } from "@/features/deleteCondition";
import { queryClient } from "@/shared/api/reactQuery";
import { useNotify } from "@/shared/lib/notifications";
import { CustomModalWindow } from "@/shared/ui/CustomModalWindow";
import { Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
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

  const notify = useNotify();

  const [groupsSelectLoading, setGroupsSelectLoading] = useState(false);

  const [groupsSelectingError, setGroupsSelectingError] = useState(false);

  const condition = mode === "edit" ? props.editData.condition : undefined;

  const updateConditionGroups =
    mode === "edit" ? props.editData.updateConditionGroups : undefined;

  const handleSuccessDelete = () => {
    if (condition) {
      removeConditionFromList(eventId, blockId, condition?.id);
      queryClient.removeQueries({
        queryKey: [eventId, blockId, condition.id],
      });
      setIsOpen(false);
    }
  };

  const handleSuccessUpdate = (id: string, groups: string[]) => {
    if (mode === "edit") {
      updateConditionGroups?.(groups);
      updateGroupsInConditionsQuery(eventId, blockId, id, groups);
      setGroupsSelectLoading(false);
      setIsOpen(false);
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

  const handleDeleteError = () => {
    notify.error({
      title: "Не удалось удалить условие перехода",
      description: "Произошла ошибка. Повторите попытку позже",
    });
  };

  const {
    data: blockOptions,
    isPending: isBlockOptionsPending,
    isError: isBlockOptionsError,
    refetch,
  } = useBlockOptions(eventId, (data) =>
    data.map((block) => {
      return {
        value: block.id,
        label: block.name,
      };
    }),
  );

  const mapGroupsToSelectOption = (data: UseGroupsQueryData) => {
    return data.data.groups.map((group) => {
      return {
        label: group.name,
        value: group.id,
      };
    });
  };

  const { data: eventGroups, isPending: isEventGroupsPending } = useGroups<
    {
      label: string;
      value: string;
    }[]
  >(eventId, mapGroupsToSelectOption);

  useEffect(() => {
    if (open) {
      void refetch();
    }
  }, [open, refetch]);
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
            onError={handleDeleteError}
          />
        )}
        <Typography.Title level={3} className="condition-window__header-title">
          Условие
        </Typography.Title>
      </div>
      <div className="condition-window__body">
        {condition ? (
          <ConditionForm<AxiosResponse<UpdateConditionResponse>>
            blockOptions={blockOptions}
            groups={eventGroups}
            isGroupsPending={isEventGroupsPending}
            isBlockOptionsPending={isBlockOptionsPending}
            isBlockOptionsError={isBlockOptionsError}
            mutationFn={(data) =>
              updateCondition(eventId, blockId, condition.id, data)
            }
            onSuccessFn={(response, variables) => {
              updateConditionInQuery(eventId, blockId, {
                ...variables,
                id: condition.id,
                blockOrder: response.data.blockOrder,
              });
              notify.success({
                title: "Условие обновлено",
              });
              setIsOpen(false);
            }}
            onHangingGroups={handleHangingGroups}
            submitBtnText="Сохранить"
            initialData={condition}
            groupsLoaded={groupsSelectLoading}
            groupsError={groupsSelectingError}
          />
        ) : (
          <ConditionForm<AxiosResponse<CreateConditionResponse>>
            groups={eventGroups}
            isGroupsPending={isEventGroupsPending}
            blockOptions={blockOptions}
            isBlockOptionsPending={isBlockOptionsPending}
            isBlockOptionsError={isBlockOptionsError}
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
