import "./NotificationIcon.scss";

interface NotificationIconProps {
  type: "correct" | "incorrect" | "partial";
  className?: string;
}

const NotificationIcon = ({ type, className }: NotificationIconProps) => {
  return (
    <img
      className={"notification__icon " + (className ?? "")}
      src={"/img/icons/" + type + ".png"}
    />
  );
};

export default NotificationIcon;
