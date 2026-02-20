import { Droppable } from "@hello-pangea/dnd";
import { Typography } from "antd";
import "./AddBlockArea.scss";
interface AddBlockAreaProps {
  showArea: boolean;
}

const AddBlockArea = ({ showArea }: AddBlockAreaProps) => {
  return (
    <div
      className="add-block-area__wrapper"
      style={{ display: showArea ? "flex" : "none" }}
    >
      <div className="add-block-area">
        <Droppable droppableId="addBlockArea" direction="vertical">
          {(provided, snapshot) => (
            <div
              className="add-block-area__content"
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "white"
                  : "var(--light-color)",
              }}
            >
              <Typography.Title className="add-block-area__text">
                Добавить блок
              </Typography.Title>
              <div
                className="add-block-area__placeholder"
                ref={provided.innerRef}
              >
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default AddBlockArea;
