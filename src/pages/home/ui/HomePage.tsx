import { useState } from "react";
import { useSearchParams } from "react-router";
import { getParams } from "../lib/paramsLib/getParams";
import CreateEventWindow from "./CreateEventWindow/CreateEventWindow";
import EventsList from "./EventsList/EventsList";
import FloatButtonsGroup from "./FloatButtonsGroup/FloatButtonsGroup";
import "./HomePage.scss";

export const HomePage = () => {
  const [params] = useSearchParams();

  const [createEventWindowOpen, setIsCreateEventWindoWOpen] =
    useState<boolean>(false);

  const [isButtonsGroupOpened, SetButtonsGroupOpened] = useState(false);

  const preparedParams = getParams(params);
  return (
    <div>
      <EventsList filters={preparedParams} />
      <FloatButtonsGroup
        setOpen={SetButtonsGroupOpened}
        open={isButtonsGroupOpened}
        setCreateEventWindowOpen={() => setIsCreateEventWindoWOpen(true)}
      />
      <CreateEventWindow
        open={createEventWindowOpen}
        setIsOpen={setIsCreateEventWindoWOpen}
      />
    </div>
  );
};
