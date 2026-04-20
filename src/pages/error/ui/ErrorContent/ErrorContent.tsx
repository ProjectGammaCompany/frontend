import { Button, Empty, Flex, Typography } from "antd";
import { isRouteErrorResponse, useNavigate } from "react-router";
import "./ErrorContent.scss";
interface ErrorContentProps {
  error: unknown;
}

const ErrorContent = ({ error }: ErrorContentProps) => {
  const navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Flex align="center" vertical gap={20}>
          <Empty description="Несуществующая страница" />
          <Button
            type="primary"
            onClick={() => {
              void navigate("/home");
            }}
          >
            Вернуться на главную страницу
          </Button>
        </Flex>
      );
    }
  }
  return (
    <Flex align="center" vertical>
      <Typography.Paragraph type="danger" className="error-content__error-text">
        Произошла непредвиденная ошибка
      </Typography.Paragraph>
      <Button
        type="primary"
        onClick={() => {
          void navigate("/home");
        }}
      >
        Вернуться на главную страницу
      </Button>
    </Flex>
  );
};

export default ErrorContent;
