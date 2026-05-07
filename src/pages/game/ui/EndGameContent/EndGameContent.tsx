import { useRateEvent } from "@/entities/Event";
import { useNotify } from "@/shared/lib";
import { Button, ConfigProvider, Rate, Typography } from "antd";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./EndGameContent.scss";
interface EndGameContentProps {
  eventId: string;
}
const EndGameContent = ({ eventId }: EndGameContentProps) => {
  const navigate = useNavigate();
  const notify = useNotify();

  const handleSuccessRate = () => {
    void navigate(`/event/${eventId}/stats`);
    notify.success({
      title: "Оценка отправлена",
      description: "Благодарим за оценку!",
    });
  };

  const handleErrorRate = () => {
    notify.error({
      title: "Не удалось оценить событие",
      description:
        "Произошла ошибка. Оцените событие повторно на его странице.",
    });
    void navigate(`/event/${eventId}/stats`);
  };

  const rateEventMutation = useRateEvent(
    eventId,
    handleSuccessRate,
    handleErrorRate,
  );

  const [rateValue, setRateValue] = useState<undefined | number>(undefined);

  useEffect(() => {
    const el = document.getElementById("root-layout");

    if (el) {
      el.classList.toggle("root-layout_on-end-game-stage");
    }

    return () => {
      if (el) {
        el.classList.toggle("root-layout_on-end-game-stage");
      }
    };
  }, []);

  return (
    <div className="end-game-content" data-testid="end-game">
      <motion.div
        initial={{
          scale: 10,
        }}
        animate={{
          scale: 2,
          transition: {
            delay: 0.5,
            duration: 1,
            type: "spring",
          },
        }}
      >
        <Typography.Title level={1} className="end-game-content__text">
          Событие пройдено
        </Typography.Title>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 1.5,
          },
        }}
      >
        <Typography.Title
          level={2}
          className="end-game-content__text end-game-content__text-congrats"
        >
          Поздравляем!
        </Typography.Title>
      </motion.div>
      <motion.div
        className="end-game-content__rate-block"
        initial={{
          height: 0,
        }}
        animate={{
          height: "auto",
          transition: {
            delay: 2,
            type: "tween",
          },
        }}
      >
        <Typography.Paragraph className="end-game-content__text">
          Оцените событие
        </Typography.Paragraph>
        <ConfigProvider
          theme={{
            components: {
              Rate: {
                starBg: "white",
              },
            },
          }}
        >
          <Rate
            value={rateValue}
            onChange={(val) => setRateValue(val)}
            disabled={rateEventMutation.isPending}
          />
        </ConfigProvider>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2,
          },
        }}
      >
        <Button
          className="end-game-content__navigate-btn"
          ghost
          onClick={() => {
            if (typeof rateValue === "number") {
              rateEventMutation.mutate(rateValue);
              return;
            }
            void navigate(`/event/${eventId}/stats`);
          }}
          loading={rateEventMutation.isPending}
        >
          Перейти к результатам
        </Button>
      </motion.div>
    </div>
  );
};

export default EndGameContent;
