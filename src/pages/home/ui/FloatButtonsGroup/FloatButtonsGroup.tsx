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
  return (
    <>
      <FloatButton
        classNames={{
          root: "home-page__actions-btn",
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
            onClick={() => {
              void navigate("/my-events");
            }}
            icon={<MyEventsSvg />}
          />
          <FloatButton
            classNames={{
              root: "home-page__create-event-btn",
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
