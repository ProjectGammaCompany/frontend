import { PlayerContent } from "@/src/widgets";
import { Fragment } from "react/jsx-runtime";
import EditorContent from "../EditorContent/EditorContent";
import "./MainContent.scss";
interface MainContentProps {
  eventId: string;
  role: number;
}

const MainContent = ({ eventId, role }: MainContentProps) => {
  return (
    <main className="event-page__main-content">
      <Fragment key={`${eventId}-${role}`}>
        {role === 0 ? (
          <PlayerContent eventId={eventId} />
        ) : (
          <EditorContent eventId={eventId} />
        )}
      </Fragment>
    </main>
  );
};

export default MainContent;
