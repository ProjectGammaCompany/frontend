import { EditorContent, ParticipantContent } from "@/src/widgets";
import "./MainContent.scss";
interface MainContentProps {
  eventId: string;
  role: number;
}

//todo: Перенести main content в ui страницы, а participantContent и editorContent в формате отдельных виджетов

const MainContent = ({ eventId, role }: MainContentProps) => {
  return (
    <main className="event-page__main-content">
      {role === 0 ? (
        <ParticipantContent eventId={eventId} />
      ) : (
        <EditorContent eventId={eventId} />
      )}
    </main>
  );
};

export default MainContent;
