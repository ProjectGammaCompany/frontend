import { useWindowWidth } from "@/shared/lib/customHooks";
import { CreateEventSvg, MoreSvg, MyEventsSvg } from "@/shared/ui/svg";
import { Button } from "antd";
import { AnimatePresence, motion } from "motion/react";
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

  const width = useWindowWidth();

  const isDesktop = width >= 700;

  const baseBottom = isDesktop ? "20px" : "90px";
  const baseRight = isDesktop ? "2dvw" : "5dvw";

  return (
    <>
      <Button
        shape="circle"
        classNames={{
          root: "float-buttons-group__actions-btn",
        }}
        style={{
          bottom: baseBottom,
          right: baseRight,
          position: "fixed",
        }}
        onClick={() => setOpen(!open)}
        icon={<MoreSvg />}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            className="float-buttons-group__button-wrapper"
            initial={{
              bottom: baseBottom,
              right: baseRight,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              y: "-70px",
              bottom: baseBottom,
              right: baseRight,
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05,
              },
            }}
            exit={{
              y: "20px",
              bottom: baseBottom,
              right: baseRight,
              opacity: 0,
              scale: 0.8,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Button
              classNames={{
                root: "float-buttons-group__my-events-btn",
              }}
              shape="circle"
              onClick={() => {
                void navigate("/my-events");
              }}
              icon={<MyEventsSvg />}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              bottom: baseBottom,
              right: baseRight,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: "-70px",
              bottom: baseBottom,
              right: baseRight,
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05,
              },
            }}
            exit={{
              x: "30px",
              bottom: baseBottom,
              right: baseRight,
              opacity: 0,
              scale: 0.8,
              transition: {
                duration: 0.2,
              },
            }}
            className="float-buttons-group__button-wrapper"
          >
            <Button
              shape="circle"
              classNames={{
                root: "float-buttons-group__create-event-btn",
              }}
              onClick={() => {
                setCreateEventWindowOpen();
              }}
              icon={<CreateEventSvg />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatButtonsGroup;
