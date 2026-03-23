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
  onError: () => void;
  timeIsUpError: boolean;
  onMutate?: () => void;
}

const SendAnswerButton = ({
  eventId,
  blockId,
  taskId,
  answer,
  disabled,
  timeIsUpError,
  onMutate,
  onSuccess,
  onError,
}: SendAnswerButtonProps) => {
  const sendAnswerMutation = useSendAnswer(
    eventId,
    blockId,
    taskId,
    onSuccess,
    onError,
    onMutate,
  );
  return (
    <Button
      onClick={() => {
        sendAnswerMutation.mutate(answer);
      }}
      loading={sendAnswerMutation.isPending}
      disabled={timeIsUpError ? false : answer.length == 0 || disabled}
    >
      Отправить
    </Button>
  );
};

export default SendAnswerButton;
