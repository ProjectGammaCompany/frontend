interface EditorStatsProps {
  eventId: string;
}

const EditorStats = ({ eventId }: EditorStatsProps) => {
  console.log(eventId);
  return <div>Статистика редактора</div>;
};

export default EditorStats;
