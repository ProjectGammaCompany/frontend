import { TaskView } from "@/entities";
import { useSendAnswer } from "@/features";
import { queryClient } from "@/shared/api";
import { useNotify } from "@/shared/lib";
import { Button } from "antd";
import "./InfoBlock.scss";
interface InfoBlockProps {
  data: InfoBlockData;
}

interface InfoBlockData {
  taskId: string;
  eventId: string;
  blockId: string;
  name: string;
  description?: string;
  files: string[];
}

const InfoBlock = ({ data }: InfoBlockProps) => {
  const { eventId, blockId, taskId: id, name: title } = data;

  const notify = useNotify();

  const handleSuccessSendAnswer = () => {
    const el = document.getElementById("root");
    el?.scrollTo({ top: 0, behavior: "smooth" });
    void queryClient.invalidateQueries({
      queryKey: [eventId, "game"],
    });
  };

  const handleErrorSendAnswer = () => {
    notify.error({
      title: "Не удалось сохранить ответ",
      description: "Произошла ошибка. Повторите попытку",
    });
  };

  const sendAnswerMutation = useSendAnswer(
    eventId,
    blockId,
    id,
    handleSuccessSendAnswer,
    handleErrorSendAnswer,
  );
  return (
    <TaskView taskData={{ ...data, title }}>
      <div className="info-block__next-btn-wrapper">
        <Button
          onClick={() => sendAnswerMutation.mutate([""])}
          loading={sendAnswerMutation.isPending}
        >
          Далее
        </Button>
      </div>
    </TaskView>
  );
};

export default InfoBlock;
