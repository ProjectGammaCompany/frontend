import { NotificationIcon } from "@/shared/ui/NotificationIcon";

export const getTaskNotificationStyle = (
  type: "correct" | "incorrect" | "partial",
  title: string,
  description?: string,
) => {
  return {
    title: title,
    description: description,
    icon: <NotificationIcon type={type} />,
    styles: {
      root: {
        paddingLeft: 5,
      },
      title: {
        color:
          type === "correct"
            ? "green"
            : type === "incorrect"
              ? "var(--error-color)"
              : "var(--warning-color_dark)",
        marginInlineStart: 50,
      },
      icon: {
        top: "min(calc(50% - 25px), 25px)",
        width: 50,
        height: 50,
      },
      description: {
        marginInlineStart: 50,
      },
    },
  };
};
