import { eventQueries } from "@/entities/Event";
import { EditEventSettingsWindow } from "@/features/editEventSettings";
import { queryClient } from "@/shared/api/reactQuery";
import { Seo } from "@/shared/lib/seo";
import { Header } from "@/shared/ui/Header";
import IconButton from "@/shared/ui/IconButton/IconButton";
import Logo from "@/shared/ui/Logo/Logo";
import { BackSvg, SettingsSvg } from "@/shared/ui/svg";
import { Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./EventHeader.scss";

interface EventHeaderProps {
  role: number;
  eventId: string;
}

const EventHeader = ({ role, eventId }: EventHeaderProps) => {
  const navigate = useNavigate();

  const [open, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {role == 1 && (
        <Seo
          title="Редактор события"
          description="Страница редактирования события."
          canonical={`event/${eventId}`}
          noIndex
        />
      )}
      <Header>
        <div className="event-page-header">
          <div
            className="event-page-header__icons-wrapper"
            onClick={() => void navigate("/home")}
          >
            <BackSvg classname="event-page-header__back-icon" />
            <Logo className="event-page-header__logo" />
          </div>
          <Typography.Title level={1} className="event-page-header__title">
            {role === 0 ? "Событие" : "Редактор"}
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
