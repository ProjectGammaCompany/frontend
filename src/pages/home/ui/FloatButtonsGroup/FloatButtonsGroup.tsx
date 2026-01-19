import { CreateEventSvg, MoreSvg, MyEventsSvg } from "@/src/shared/ui";
import { FloatButton } from "antd";
import { useNavigate } from "react-router";
import "./FloatButtonsGroup.scss";
interface FloatButtonsGroupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setCreateEventWindowOpen: () => void;
}

const FloatButtonsGroup = ({
  open,
  setOpen,
  setCreateEventWindowOpen,
}: FloatButtonsGroupProps) => {
  const navigate = useNavigate();

  //todo: добавить страницу myEvents
  return (
    <>
      <FloatButton
        classNames={{
          root: "home-page__actions-btns",
        }}
        style={{
          bottom: "80px",
          right: "5dvw",
        }}
        onClick={() => setOpen(!open)}
        icon={<MoreSvg />}
      />
      {open && (
        <>
          <FloatButton
            classNames={{
              root: "home-page__my-events-btn",
            }}
            style={{
              bottom: "calc(80px + 70px)",
              right: "calc(5dvw)",
            }}
            onClick={() => {
              void navigate("/myEvent");
            }}
            icon={<MyEventsSvg />}
          />
          <FloatButton
            classNames={{
              root: "home-page__create-event-btn",
            }}
            style={{
              bottom: "calc(80px + 10px)",
              right: "calc(5dvw + 70px)",
            }}
            onClick={() => {
              setCreateEventWindowOpen();
            }}
            icon={<CreateEventSvg />}
          />
        </>
      )}
    </>
  );
};

export default FloatButtonsGroup;
