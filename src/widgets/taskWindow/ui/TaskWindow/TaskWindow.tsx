import {
  createTask,
  TaskForm,
  updateTask,
  useEditorTaskData,
  type ClientOption,
  type CreateTaskResponse,
  type ServerOption,
  type UpdateTaskResponse,
} from "@/src/entities";
import { DeleteTaskButton } from "@/src/features";
import { CustomModalWindow } from "@/src/shared/ui";
import { Input } from "antd";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTaskToList } from "../../model/addTaskToList";
import { removeTaskFromList } from "../../model/removeTaskFromList";
import { updateTaskInList } from "../../model/updateTaskInQuery";
import { updateTaskOptions as updateTaskData } from "../../model/updateTaskOptions";
import "./TaskWindow.scss";

export type TaskWindowMode = "create" | "edit";

interface TaskWindowProps {
  eventId: string;
  blockId: string;
  order: number;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

type CreateTaskProps = TaskWindowProps & {
  mode: Extract<TaskWindowMode, "create">;
};

type EditTaskProps = TaskWindowProps & {
  mode: Extract<TaskWindowMode, "edit">;
  editData: {
    id: string;
  };
};

const TaskWindow = (props: CreateTaskProps | EditTaskProps) => {
  const { eventId, blockId, mode, open, setIsOpen, order } = props;

  const id = mode === "edit" ? props.editData.id : undefined;

  const { data } = useEditorTaskData(mode, eventId, blockId, id);

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
    if (id) {
      removeTaskFromList(eventId, blockId, id);
      setIsOpen(false);
    }
  };

  const handleAfterClose = () => {
    setName("");
  };

  useEffect(() => {
    if (data && open) {
      setName(data?.name);
    }
  }, [data, open]);

  return (
    <CustomModalWindow
      open={open}
      setIsOpen={setIsOpen}
      afterClose={handleAfterClose}
    >
      {props.mode === "edit" && id && (
        <DeleteTaskButton
          eventId={eventId}
          blockId={blockId}
          taskId={id}
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
      {props.mode === "edit" && id && data ? (
        <TaskForm<AxiosResponse<UpdateTaskResponse>>
          submitBtnText="Сохранить"
          order={order}
          name={name}
          mutationFn={(data) => updateTask(eventId, blockId, id, data)}
          initialData={{
            ...data,
            options: mapServerOptionsToClientOptions(data.options),
          }}
          onSuccessFn={(data, variables) => {
            updateTaskInList(
              eventId,
              blockId,
              id,
              variables.name,
              data.data.order - 1,
            );
            updateTaskData(
              eventId,
              blockId,
              id,
              variables.name,
              data.data.options,
            );
          }}
          onSuccessText="Данные успешно обновлены"
        />
      ) : (
        <TaskForm<AxiosResponse<CreateTaskResponse>>
          submitBtnText="Создать"
          order={order}
          name={name}
          mutationFn={(data) => createTask(eventId, blockId, data)}
          onSuccessFn={(data, variables) => {
            addTaskToList(
              eventId,
              blockId,
              data.data.taskId,
              variables.name,
              order,
            );
            setIsOpen(false);
          }}
        />
      )}
    </CustomModalWindow>
  );
};

export default TaskWindow;
