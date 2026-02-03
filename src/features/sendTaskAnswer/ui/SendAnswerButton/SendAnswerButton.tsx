import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import type { AxiosResponse } from "axios";
import { sendAnswer, type SendAnswerResponse } from "../../api/sendAnswer";

interface SendAnswerButtonProps {
  eventId: string;
  blockId: string;
  taskId: string;
  answer: string[];
  onSuccess: (data: AxiosResponse<SendAnswerResponse>) => void;
}

const SendAnswerButton = ({
  eventId,
  blockId,
  taskId,
  answer,
  onSuccess,
}: SendAnswerButtonProps) => {
  const sendAnswerMutation = useMutation({
    mutationFn: () => sendAnswer(eventId, blockId, taskId, answer),
    onSuccess: onSuccess,
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
