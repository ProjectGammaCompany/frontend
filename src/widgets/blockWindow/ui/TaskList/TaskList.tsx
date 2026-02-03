import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Button } from "antd";
import { useCallback } from "react";
import { useTasks } from "../../model/useTasks";
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
  const onDragEnd = useCallback(() => {
    //ssddssd
  }, []);

  const { data: tasks, isPending, isError } = useTasks(eventId, blockId);

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка!</div>;
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
                  onClick={() => onTaskClick(task.id, index)}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        className="task-list__add-btn"
        onClick={() => {
          onCreateTask(tasks.length);
        }}
      >
        Добавить задание
      </Button>
    </div>
  );
};

export default TaskList;
