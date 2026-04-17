import { Seo } from "@/shared/lib";
import { Button, ConfigProvider, Flex, Typography } from "antd";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./LandingPage.scss";
const LandingPage = () => {
  const navigate = useNavigate();
  const EVENTS = [
    "Квесты",
    "Тесты",
    "Викторины",
    "И другие интерактивные события",
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EduPlay",
    url: "https://hse-eduplay.ru",
    description:
      "Платформа для создания и проведения квестов и интерактивных мероприятий",
  };
  useEffect(() => {
    const el = document.getElementById("root-layout");

    if (el) {
      el.classList.toggle("root-layout_on-landing-page");
    }

    return () => {
      if (el) {
        el.classList.toggle("root-layout_on-landing-page");
      }
    };
  }, []);
  return (
    <main className="landing-page">
      <Seo
        title="EduPlay – платформа для создания квестов и интерактивных мероприятий"
        description="EduPlay — платформа для создания и проведения квестов, тестов и интерактивных мероприятий. Подходит для обучения, мероприятий и оценки знаний."
        canonical={``}
        schemaMarkup={schemaMarkup}
        specificTitle
      />
      <ConfigProvider>
        <Typography.Title
          level={1}
          className="landing-page__main-title landing-page__text"
        >
          EduPlay
        </Typography.Title>
        <Typography.Title
          level={2}
          className="landing-page__text landing-page__text_centered"
        >
          Кто мы?
        </Typography.Title>
        <Typography.Paragraph className="landing-page__text landing-page__text_centered landing-page__explain-text">
          Та самая платформа, где ты можешь создать собственные:
        </Typography.Paragraph>
        <motion.ul
          className="landing-page__events-list"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.5,
            },
          }}
        >
          {EVENTS.map((el) => (
            <li key={el}>
              <Typography.Paragraph
                className="landing-page__text landing-page__text_centered landing-page__events-item"
                strong
              >
                {el}
              </Typography.Paragraph>
            </li>
          ))}
        </motion.ul>
        <Typography.Paragraph
          className="landing-page__text landing-page__text_right-align landing-page__extra-text"
          italic
          strong
        >
          При этом добавив в них образовательный контент! ;&#41;
        </Typography.Paragraph>
        <Typography.Paragraph
          className="landing-page__text landing-page__text_centered landing-page__auth-text"
          strong
        >
          Авторизируйся и испытай нашу универсальную платформу!
        </Typography.Paragraph>
        <Flex justify="center">
          <Button
            onClick={() => {
              void navigate("/auth");
            }}
            size="large"
            classNames={{
              root: "landing-page__auth-btn",
            }}
          >
            Авторизоваться
          </Button>
        </Flex>
      </ConfigProvider>
    </main>
  );
};

export default LandingPage;
