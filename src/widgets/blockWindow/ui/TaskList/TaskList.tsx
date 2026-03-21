import {
  selectTasksReorderingState,
  setTasksReorderingState,
  useTasks,
  useUpdateTasksOrder,
} from "@/src/entities";
import { useNotify } from "@/src/shared/lib";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { Button, Flex, Spin, Typography } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTasksOrderInQuery } from "../../model/updateTasksOrderInQuery";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.scss";
interface TasksListProps {
  eventId: string;
  blockId: string;
  onTaskClick: (id: string, order: number) => void;
  onCreateTask: (order: number) => void;
}

const TaskList = ({
  eventId,
  blockId,
  onTaskClick,
  onCreateTask,
}: TasksListProps) => {
  const {
    data: tasks,
    isPending,
    isError,
    refetch,
  } = useTasks(eventId, blockId);

  const taskReorderingState = useSelector(selectTasksReorderingState);

  const notify = useNotify();

  const dispatch = useDispatch();

  const handleSuccessTasksReordering = () => {
    dispatch(setTasksReorderingState(false));
  };

  const handleErrorTasksReordering = () => {
    notify.error({
      title: "Не удалось обновить порядок заданий",
      description: "Произошла ошибка. Повторите попытку позже",
    });
  };

  const updateTasksOrderMutation = useUpdateTasksOrder(
    eventId,
    blockId,
    handleSuccessTasksReordering,
    handleErrorTasksReordering,
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!destination) {
        return;
      }
      if (
        draggableId === destination.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      if (tasks) {
        dispatch(setTasksReorderingState(true));
        const newTasks = Array.from(tasks);
        const movedTask = tasks.find((task) => task.id === draggableId);
        if (movedTask) {
          newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, movedTask);
          newTasks.forEach((task, index) => {
            newTasks[index] = {
              ...task,
              order: index + 1,
            };
          });
          updateTasksOrderInQuery(eventId, blockId, newTasks);
        }
      }
    },
    [blockId, dispatch, eventId, tasks],
  );

  const handleTaskItemClick = (id: string, index: number) => {
    if (!taskReorderingState) {
      onTaskClick(id, index);
    }
  };

  const handleSaveTaskReordering = () => {
    if (tasks) {
      updateTasksOrderMutation.mutate(tasks.map((task) => task.id));
    }
  };

  if (isPending) {
    return (
      <Flex justify="center">
        <Spin />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" vertical>
        <Typography.Paragraph type="danger">
          Произошла ошибка. Повторите попытку
        </Typography.Paragraph>
        <Button
          onClick={() => {
            void refetch();
          }}
        >
          Обновить
        </Button>
      </Flex>
    );
  }
  return (
    <div className="task-list__wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="task-list"
            >
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  data={task}
                  index={index}
                  onClick={() => handleTaskItemClick(task.id, index)}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {!taskReorderingState && (
        <Button
          className="task-list__add-btn"
          onClick={() => {
            onCreateTask(tasks.length);
          }}
        >
          Добавить задание
        </Button>
      )}
      {taskReorderingState && (
        <Button onClick={handleSaveTaskReordering}>Сохранить порядок</Button>
      )}
    </div>
  );
};

export default TaskList;
