import { CreateEventSvg, MoreSvg, MyEventsSvg } from "@/src/shared/ui";
import { FloatButton } from "antd";
import type React from "react";
import { useNavigate } from "react-router";
import "./FloatButtonsGroup.scss";
interface FloatButtonsGroupProps {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const FloatButtonsGroup = ({ setOpen, open }: FloatButtonsGroupProps) => {
  const navigate = useNavigate();

  return (
    <>
      <FloatButton
        className="home-page__actions-btns"
        onClick={() => setOpen(!open)}
        icon={<MoreSvg />}
      />
      {open && (
        <>
          <FloatButton
            className="home-page__my-events-btn"
            onClick={() => {
              void navigate("/myEvent");
            }}
            icon={<MyEventsSvg />}
          />
          <FloatButton
            className="home-page__create-event-btn"
            onClick={() => {
              console.log("create");
            }}
            icon={<CreateEventSvg />}
          />
        </>
      )}
    </>
  );
};

export default FloatButtonsGroup;
