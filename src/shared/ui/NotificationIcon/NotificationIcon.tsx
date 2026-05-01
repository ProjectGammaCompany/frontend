import "./NotificationIcon.scss";

interface NotificationIconProps {
  type: "correct" | "incorrect" | "partially";
  className?: string;
}

export const NotificationIcon = ({
  type,
  className,
}: NotificationIconProps) => {
  return (
    <img
      className={"notification__icon " + (className ?? "")}
      src={"/img/icons/" + type + ".png"}
    />
  );
};
