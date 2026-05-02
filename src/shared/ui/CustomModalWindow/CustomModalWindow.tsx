import { Modal } from "antd";
import type { ReactNode } from "react";
import { CrossSvg } from "../svg/CrossSvg";
import "./CustomModalWindow.scss";
interface CustomModalWindowProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  children?: ReactNode;
  loading?: boolean;
  afterClose?: () => void;
  zIndex?: number;
}

//TODO: отредактировать кнопку сворачивания
const CustomModalWindow = ({
  open,
  setIsOpen,
  children,
  loading,
  afterClose,
  zIndex,
}: CustomModalWindowProps) => {
  return (
    <Modal
      footer={null}
      open={open}
      loading={loading}
      afterClose={afterClose}
      zIndex={zIndex}
      onCancel={() => setIsOpen(false)}
      centered
      closeIcon={
        <div className="custom-modal-window__close-btn">
          <CrossSvg />
        </div>
      }
      mask={{
        closable: false,
      }}
      destroyOnHidden
      classNames={{
        container: "custom-modal-window__container",
        body: "custom-modal-window__body",
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModalWindow;
