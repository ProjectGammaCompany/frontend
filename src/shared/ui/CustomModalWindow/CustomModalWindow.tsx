import { Modal } from "antd";
import type { ReactNode } from "react";
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
      maskClosable={false}
      classNames={{
        container: "custom-modal-window__container",
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModalWindow;
