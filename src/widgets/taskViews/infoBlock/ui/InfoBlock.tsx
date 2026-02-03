import { TaskView } from "@/src/entities";
import { useSendAnswer } from "@/src/features/sendTaskAnswer";
import { queryClient } from "@/src/shared/api";
import { Button } from "antd";
import "./InfoBlock.scss";
interface InfoBlockProps {
  data: InfoBlockData;
}

interface InfoBlockData {
  id: string;
  eventId: string;
  blockId: string;
  name: string;
  description?: string;
  files: string[];
}

const InfoBlock = ({ data }: InfoBlockProps) => {
  const { eventId, blockId, id, name: title } = data;

  const handleSuccessSendingAnswer = () => {
    const el = document.getElementById("root");
    el?.scrollTo({ top: 0, behavior: "smooth" });
    void queryClient.invalidateQueries({
      queryKey: [eventId, "game"],
    });
  };
  const sendAnswerMutation = useSendAnswer(
    eventId,
    blockId,
    id,
    [""],
    handleSuccessSendingAnswer,
  );
  return (
    <TaskView taskData={{ ...data, title }}>
      <div className="info-block__next-btn-wrapper">
        <Button
          onClick={() => sendAnswerMutation.mutate()}
          loading={sendAnswerMutation.isPending}
        >
          Далее
        </Button>
      </div>
    </TaskView>
  );
};

export default InfoBlock;
