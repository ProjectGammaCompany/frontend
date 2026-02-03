import {
  ConditionForm,
  createCondition,
  type Condition,
  type CreateConditionResponse,
} from "@/src/entities";
import { DeleteConditionButton } from "@/src/features";
import { CustomModalWindow } from "@/src/shared/ui";
import { Typography } from "antd";
import type { AxiosResponse } from "axios";
import { addConditionToList } from "../model/addConditionToList";
import { removeConditionFromList } from "../model/removeConditionFromList";
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
  };
};

const ConditionWindow = (
  props: CreateConditionWindow | EditConditionWindow,
) => {
  const { mode, open, setIsOpen, eventId, blockId } = props;

  const condition = mode === "edit" ? props.editData.condition : undefined;

  const handleSuccessDelete = () => {
    if (condition) {
      removeConditionFromList(eventId, blockId, condition?.id);
      setIsOpen(false);
    }
  };

  //todo: добавить put
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
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
          <ConditionForm
            eventId={eventId}
            mutationFn={() => Promise.resolve()}
            submitBtnText="Сохранить"
            initialData={condition}
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
