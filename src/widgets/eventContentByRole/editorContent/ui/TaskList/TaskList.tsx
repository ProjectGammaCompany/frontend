import { getTasks } from "@/src/entities";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setTaskId, setTaskOrder } from "../../model/taskDataSlice";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.scss";
interface TasksListProps {
  eventId: string;
  blockId: string;
  setTaskWindowOpen: (value: boolean) => void;
}

const TaskList = ({ eventId, blockId, setTaskWindowOpen }: TasksListProps) => {
  const onDragEnd = useCallback(() => {
    //ssddssd
  }, []);

  const {
    data: tasks,
    isPending,
    isError,
  } = useQuery({
    queryKey: [eventId, blockId, "tasksList"],
    queryFn: () => getTasks(eventId, blockId),
    select: (data) => data.data.tasks,
  });

  const dispatch = useDispatch();

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
                  onClick={() => {
                    dispatch(setTaskId(task.id));
                    dispatch(setTaskOrder(index));
                    setTaskWindowOpen(true);
                  }}
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
          dispatch(setTaskId(""));
          setTaskWindowOpen(true);
          dispatch(setTaskOrder(tasks.length));
        }}
      >
        Добавить задание
      </Button>
    </div>
  );
};

export default TaskList;
