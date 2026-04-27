import { downloadApk, Seo } from "@/shared/lib";
import { Button, Typography } from "antd";
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

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
      <motion.section
        className="landing-page__hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography.Title level={1} className="landing-page__hero-title">
          EduPlay
        </Typography.Title>

        <Typography.Paragraph className="landing-page__hero-subtitle">
          Платформа для создания квестов, тестов и интерактивных мероприятий
        </Typography.Paragraph>

        <Button
          size="large"
          type="primary"
          className="landing-page__cta-btn"
          onClick={() => void navigate("/auth")}
        >
          Начать бесплатно
        </Button>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="landing-page__features"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {EVENTS.map((el) => (
            <motion.div
              key={el}
              className="landing-page__feature-card"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Typography.Text strong>{el}</Typography.Text>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <motion.section
        className="landing-page__cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Typography.Title level={3} className="landing-page__cta-text">
          Попробуй EduPlay прямо сейчас
        </Typography.Title>

        <Button
          type="primary"
          size="large"
          className="landing-page__cta-btn"
          onClick={() => void navigate("/auth")}
        >
          Авторизоваться
        </Button>
        <Button
          type="primary"
          size="large"
          className="landing-page__cta-btn"
          onClick={downloadApk}
        >
          Получить Android-приложение
        </Button>
      </motion.section>
    </main>
  );
};

export default LandingPage;
