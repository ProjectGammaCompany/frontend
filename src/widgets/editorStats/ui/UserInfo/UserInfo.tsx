import type { PassedTask } from "@/entities/Event";
import { useEditorUserStats } from "@/entities/Event";
import {
  Button,
  Collapse,
  Flex,
  Spin,
  Typography,
  type CollapseProps,
} from "antd";
import PassedTaskView from "../PassedTask/PassedTask";
import "./UserInfo.scss";

interface EditorUserInfoProps {
  userId: string;
  eventId: string;
}
const UserInfo = ({ userId, eventId }: EditorUserInfoProps) => {
  const {
    data: blocks,
    isPending,
    isError,
    refetch,
  } = useEditorUserStats(eventId, userId);

  if (isPending) {
    return (
      <Flex justify="center" align="center">
        <Spin />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" vertical gap={10}>
        <Typography.Paragraph
          type="danger"
          className="editor-content__error-text"
        >
          Произошла ошибка. Обновите страницу
        </Typography.Paragraph>
        <Button
          onClick={() => {
            void refetch();
          }}
          className="editor-content__refetch-btn"
        >
          Обновить
        </Button>
      </Flex>
    );
  }

  const getBlockCollapseItems = (
    tasks: PassedTask[],
  ): CollapseProps["items"] => {
    return tasks.map((task) => {
      return {
        key: task.id,
        label: task.name + (task.type === 0 ? " (инф. блок)" : ""),
        children: task.type == 0 ? undefined : <PassedTaskView task={task} />,
        collapsible: task.type == 0 ? "disabled" : "header",
        showArrow: task.type != 0,
        classNames: {
          header: "user-info__header",
          title: "user-info__title",
          icon: "user-info__icon",
        },
      };
    });
  };

  const items: CollapseProps["items"] = blocks.map((block) => {
    return {
      key: block.id,
      label: block.name,
      children: <Collapse items={getBlockCollapseItems(block.tasks)} />,
    };
  });

  return <Collapse items={items} />;
};

export default UserInfo;
