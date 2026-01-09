interface InfoBlockProps {
  data: InfoBlockData;
}

interface InfoBlockData {
  name: string;
  description?: string;
  files: string[];
}

const InfoBlock = ({ data }: InfoBlockProps) => {
  return <div>{data.description}</div>;
};

export default InfoBlock;
