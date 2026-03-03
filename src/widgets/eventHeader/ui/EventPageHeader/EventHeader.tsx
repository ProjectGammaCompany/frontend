import { eventQueries } from "@/src/entities";
import { EditEventSettingsWindow } from "@/src/features";
import { queryClient } from "@/src/shared/api";
import {
  BackSvg,
  Header,
  IconButton,
  Logo,
  SettingsSvg,
} from "@/src/shared/ui";
import { Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./EventHeader.scss";

interface EventHeaderProps {
  role: number;
  eventId: string;
}

//todo: подумать, нужен ли перенос окна в mainContent
const EventHeader = ({ role, eventId }: EventHeaderProps) => {
  const navigate = useNavigate();

  const [open, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Header>
        <div className="event-page-header">
          <div
            className="event-page-header__icons-wrapper"
            onClick={() => void navigate("/")}
          >
            <BackSvg classname="event-page-header__back-icon" />
            <Logo />
          </div>
          <Typography.Title level={1} className="event-page-header__title">
            {role === 0 ? "Страница события" : "Редактор"}
          </Typography.Title>
          {role === 1 && (
            <IconButton
              icon={<SettingsSvg />}
              onClick={() => {
                void queryClient
                  .invalidateQueries({
                    queryKey: eventQueries.getSettings(eventId),
                  })
                  .then(() => {
                    setIsOpen(true);
                  });
              }}
              className="event-page-header__settings-btn"
              iconWrapperClassname="event-page-header__settings-icon"
            />
          )}
        </div>
      </Header>
      {role === 1 && (
        <EditEventSettingsWindow
          eventId={eventId}
          open={open}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default EventHeader;
