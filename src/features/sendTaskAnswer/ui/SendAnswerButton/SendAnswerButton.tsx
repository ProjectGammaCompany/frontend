import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { sendAnswer } from "../../api/sendAnswer";

interface SendAnswerButtonProps {
  eventId: string;
  blockId: string;
  taskId: string;
  answer: string[];
  successFn: (rightAnswer?: string[], points?: number) => void;
}

const SendAnswerButton = ({
  eventId,
  blockId,
  taskId,
  answer,
  successFn,
}: SendAnswerButtonProps) => {
  const sendAnswerMutation = useMutation({
    mutationFn: () => sendAnswer(eventId, blockId, taskId, answer),
    onSuccess: (data) => successFn(data.data.rightAnswer, data.data.points),
  });
  return (
    <Button
      onClick={() => sendAnswerMutation.mutate()}
      disabled={answer.length == 0}
    >
      Отправить
    </Button>
  );
};

export default SendAnswerButton;
