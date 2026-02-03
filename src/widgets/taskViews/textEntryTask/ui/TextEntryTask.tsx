interface ChoiceTaskProps {
  data: TextEntryTaskData;
}

//todo: change for final version
//todo: не забыть приведение в lowercase перед отправкой ответа
interface TextEntryTaskData {
  name: string;
  description?: string;
  files: string[];
}

const TextEntryTask = ({ data }: ChoiceTaskProps) => {
  return <div>{data.description}</div>;
};

export default TextEntryTask;
