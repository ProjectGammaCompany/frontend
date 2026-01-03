interface ParticipantContentProps {
  eventId: string;
}

const ParticipantContent = ({ eventId }: ParticipantContentProps) => {
  console.log(eventId);
  return <div>Контент участника</div>;
};

export default ParticipantContent;
