import {
  ConditionForm,
  createCondition,
  type CreateConditionResponse,
  type GetConditionsResponse,
} from "@/src/entities";
import { queryClient } from "@/src/shared/api";
import { CustomModalWindow } from "@/src/shared/ui";
import { Button, Typography } from "antd";
import type { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { selectCondition } from "../../model/conditionSlice";

interface ConditionWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  eventId: string;
  blockId: string;
}

const ConditionWindow = ({
  open,
  setIsOpen,
  eventId,
  blockId,
}: ConditionWindowProps) => {
  const condition = useSelector(selectCondition);

  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      <div>
        {condition && <Button>У</Button>}
        <Typography.Title level={3}>Условие</Typography.Title>
      </div>
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
            queryClient.setQueryData(
              [eventId, blockId, "conditionsList"],
              (oldData: AxiosResponse<GetConditionsResponse>) => {
                if (oldData) {
                  const newData: AxiosResponse<GetConditionsResponse> = {
                    ...oldData,
                    data: {
                      conditions: [
                        ...oldData.data.conditions,
                        {
                          ...variables,
                          id: response.data.id,
                          blockOrder: response.data.blockOrder,
                        },
                      ],
                    },
                  };
                  return newData;
                }
                return oldData;
              },
            );
            setIsOpen(false);
          }}
        />
      )}
    </CustomModalWindow>
  );
};

export default ConditionWindow;
