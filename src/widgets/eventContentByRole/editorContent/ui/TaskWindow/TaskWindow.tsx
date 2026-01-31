import {
  createTask,
  getEditorTaskData,
  TaskForm,
  type ClientOption,
  type CreateTaskResponse,
  type GetTasksResponse,
  type ServerOption,
} from "@/src/entities";
import { DeleteTaskButton } from "@/src/features";
import { queryClient } from "@/src/shared/api";
import { CustomModalWindow } from "@/src/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectTaskId, selectTaskOrder } from "../../model/taskDataSlice";
import "./TaskWindow.scss";
interface TaskWindowProps {
  eventId: string;
  blockId: string;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

const TaskWindow = ({ eventId, blockId, open, setIsOpen }: TaskWindowProps) => {
  const taskId = useSelector(selectTaskId);
  const taskOrder = useSelector(selectTaskOrder);

  const { data } = useQuery({
    queryKey: [eventId, blockId, taskId, "taskData"],
    queryFn: () => {
      return getEditorTaskData(eventId, blockId, taskId);
    },
    select: (data) => data.data,
    enabled: !!taskId,
  });

  const mapServerOptionsToClientOptions = (
    options: ServerOption[],
  ): ClientOption[] => {
    return options.map((option) => {
      return {
        ...option,
        clientId: uuidv4(),
      };
    });
  };

  const [name, setName] = useState(data?.name ?? "");

  const handleSuccessDelete = () => {
    queryClient.setQueryData(
      [eventId, blockId, "tasksList"],
      (oldData: AxiosResponse<GetTasksResponse>) => {
        if (oldData) {
          const newData: AxiosResponse<GetTasksResponse> = {
            ...oldData,
            data: {
              ...oldData.data,
              tasks: oldData.data.tasks
                .filter((elem) => elem.id != taskId)
                .map((elem, index) => {
                  return {
                    ...elem,
                    order: index + 1,
                  };
                }),
            },
          };
          return newData;
        }
        return oldData;
      },
    );
    setIsOpen(false);
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
    }
    return () => {
      setName("");
    };
  }, [data]);

  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}>
      {taskId && (
        <DeleteTaskButton
          eventId={eventId}
          blockId={blockId}
          taskId={taskId}
          onSuccess={handleSuccessDelete}
        />
      )}
      <div className="task-window__header">
        <Input
          placeholder="Введите название"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="task-window__title-input"
        />
      </div>
      {taskId && data ? (
        <TaskForm
          submitBtnText="Сохранить"
          order={taskOrder}
          name={name}
          mutationFn={() => Promise.resolve()}
          initialData={{
            ...data,
            options: mapServerOptionsToClientOptions(data.options),
          }}
        />
      ) : (
        <TaskForm<AxiosResponse<CreateTaskResponse>>
          submitBtnText="Создать"
          order={taskOrder}
          name={name}
          mutationFn={(data) => createTask(eventId, blockId, data)}
          onSuccessFn={(data, variables) => {
            queryClient.setQueryData(
              [eventId, blockId, "tasksList"],
              (oldData: AxiosResponse<GetTasksResponse>) => {
                if (oldData) {
                  const newData: AxiosResponse<GetTasksResponse> = {
                    ...oldData,
                    data: {
                      tasks: [
                        ...oldData.data.tasks,
                        {
                          id: data.data.taskId,
                          name: variables.name,
                          order: taskOrder,
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

export default TaskWindow;
