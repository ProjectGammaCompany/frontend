import { Input, Typography } from "antd";

interface TextInputBlockProps {
  answer: string[];
  setAnswer: (answer: string[]) => void;
  disabled: boolean;
}

const TextInputBlock = ({
  answer,
  setAnswer,
  disabled,
}: TextInputBlockProps) => {
  return (
    <>
      <Typography.Paragraph>Введите ответ:</Typography.Paragraph>
      <Input
        placeholder="Ответ"
        disabled={disabled}
        value={answer.at(0) ?? ""}
        onChange={(e) => setAnswer([e.currentTarget.value])}
      />
    </>
  );
};

export default TextInputBlock;
