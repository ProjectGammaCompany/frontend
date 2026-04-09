import type { TaskItem } from "@/entities";
import { BackSvg } from "@/shared/ui";
import { Button, Carousel } from "antd";
import TaskSliderItem from "../TaskSliderItem/TaskSliderItem";
import "./TaskSlider.scss";

interface TaskSliderProps {
  tasks: TaskItem[];
  onTaskChoice: (taskId: string) => void;
  selectedTasks: string[];
}

const TaskSlider = ({
  tasks,
  onTaskChoice,
  selectedTasks,
}: TaskSliderProps) => {
  return (
    <Carousel
      arrows
      infinite={false}
      adaptiveHeight
      className="task-slider"
      prevArrow={
        <Button
          className="task-slider__arrow-btn"
          icon={
            <BackSvg classname="task-slider__arrow task-slider__arrow_prev" />
          }
        />
      }
      nextArrow={
        <Button
          className="task-slider__arrow-btn"
          icon={
            <BackSvg classname="task-slider__arrow task-slider__arrow_next" />
          }
        />
      }
    >
      {tasks.map((task) => (
        <TaskSliderItem
          key={task.id}
          task={task}
          onClick={onTaskChoice}
          isSelected={selectedTasks.includes(task.id)}
        />
      ))}
    </Carousel>
  );
};

export default TaskSlider;
