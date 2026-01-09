interface ChoiceTaskProps {
  data: TextEntryTaskData;
}

//todo: change
interface TextEntryTaskData {
  name: string;
  description?: string;
  files: string[];
}

const TextEntryTask = ({ data }: ChoiceTaskProps) => {
  return <div>{data.description}</div>;
};

export default TextEntryTask;
