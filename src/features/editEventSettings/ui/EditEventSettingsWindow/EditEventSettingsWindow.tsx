import { CustomModalWindow } from "@/src/shared/ui";

interface EditEventWindowProps {
  eventId: string;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

const EditEventSettingsWindow = ({ open, setIsOpen }: EditEventWindowProps) => {
  return (
    <CustomModalWindow open={open} setIsOpen={setIsOpen}></CustomModalWindow>
  );
};

export default EditEventSettingsWindow;
