import {
  createTask,
  TaskForm,
  updateTask,
  useEditorTaskData,
  type ClientOption,
  type CreateTaskResponse,
  type GetEditorTaskDataResponse,
  type ServerOption,
  type UpdateTaskResponse,
} from "@/entities";
import { DeleteTaskButton } from "@/features";
import { useNotify } from "@/shared/lib";
import { CustomModalWindow } from "@/shared/ui";
import type { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import { addTaskToList } from "../../model/addTaskToList";
import { removeTaskFromList } from "../../model/removeTaskFromList";
import { updateTaskInQuery } from "../../model/updateTaskInQuery";
import { updateTaskData } from "../../model/updateTaskOptions";
import "./TaskWindow.scss";

export type TaskWindowMode = "create" | "edit";

interface TaskWindowProps {
  eventId: string;
  blockId: string;
  order: number;
  open: boolean;
  setIsOpen: (value: boolean) => void;
  onClose?: () => void;
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
  const { eventId, blockId, mode, open, setIsOpen, order, onClose } = props;

  const id = mode === "edit" ? props.editData.id : undefined;

  const { data } = useEditorTaskData(mode, eventId, blockId, id);

  const notify = useNotify();

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

  const handleSuccessDelete = () => {
    if (id) {
      removeTaskFromList(eventId, blockId, id);
      setIsOpen(false);
    }
  };

  const handleErrorDelete = () => {
    notify.error({
      title: "Не удалось удалить задание",
      description: "Произошла ошибка. Повторите попытку позже",
    });
  };
  const handleAfterClose = () => {
    onClose?.();
  };

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
          onError={handleErrorDelete}
        />
      )}
      {props.mode === "edit" && id && data ? (
        <TaskForm<AxiosResponse<UpdateTaskResponse>>
          className="task-window__task-form"
          submitBtnText="Сохранить"
          order={order}
          onFileLoadError={() => {
            notify.error({
              title: "Не удалось загрузить файл",
              description: "Произошла ошибка. Повторите попытку позже",
            });
          }}
          mutationFn={(data) => updateTask(eventId, blockId, id, data)}
          initialData={{
            ...data,
            options: mapServerOptionsToClientOptions(data.options),
          }}
          onSuccessFn={(data, variables) => {
            updateTaskInQuery(
              eventId,
              blockId,
              id,
              variables.name,
              data.data.order - 1,
            );
            const updatedData: GetEditorTaskDataResponse = {
              ...variables,
              options: data.data.options,
              partialPoints:
                typeof variables.partialPoints === "boolean"
                  ? variables.partialPoints
                  : false,
            };
            updateTaskData(eventId, blockId, id, updatedData);
          }}
          onSuccessText="Данные успешно обновлены"
        />
      ) : (
        <TaskForm<AxiosResponse<CreateTaskResponse>>
          className="task-window__task-form"
          submitBtnText="Создать"
          order={order}
          onFileLoadError={() => {
            notify.error({
              title: "Не удалось загрузить файл",
              description: "Произошла ошибка. Повторите попытку позже",
            });
          }}
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
