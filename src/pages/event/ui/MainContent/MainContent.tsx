import { PlayerContent } from "@/src/widgets";
import EditorContent from "../EditorContent/EditorContent";
import "./MainContent.scss";
interface MainContentProps {
  eventId: string;
  role: number;
}

const MainContent = ({ eventId, role }: MainContentProps) => {
  console.log(role);
  return (
    <main className="event-page__main-content">
      {role === 0 ? (
        <PlayerContent eventId={eventId} />
      ) : (
        <EditorContent eventId={eventId} />
      )}
    </main>
  );
};

export default MainContent;
