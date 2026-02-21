import { Button } from "antd";
import type { AxiosResponse } from "axios";
import { type SendAnswerResponse } from "../../api/sendAnswer";
import { useSendAnswer } from "../../model/useSendAnswer";

interface SendAnswerButtonProps {
  eventId: string;
  blockId: string;
  taskId: string;
  answer: string[];
  disabled?: boolean;
  onSuccess: (data: AxiosResponse<SendAnswerResponse>) => void;
}

const SendAnswerButton = ({
  eventId,
  blockId,
  taskId,
  answer,
  disabled,
  onSuccess,
}: SendAnswerButtonProps) => {
  const sendAnswerMutation = useSendAnswer(eventId, blockId, taskId, onSuccess);
  return (
    <Button
      onClick={() => sendAnswerMutation.mutate(answer)}
      disabled={answer.length == 0 || disabled}
    >
      Отправить
    </Button>
  );
};

export default SendAnswerButton;
