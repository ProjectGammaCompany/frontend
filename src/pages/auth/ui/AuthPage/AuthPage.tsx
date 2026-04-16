import { Seo } from "@/shared/lib";
import { Segmented, Typography } from "antd";
import classnames from "classnames";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
} from "motion/react";
import { useEffect, useState } from "react";
import { PAGE_STATES, PAGE_STATES_VALUES } from "../../const/pageStates";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./AuthPage.scss";
export const AuthPage = () => {
  const INITIAL_LOGIN_FORM_STYLES: TargetAndTransition = {
    x: "-100dvw",

    transition: {
      duration: 0.5,
    },
  };

  const INITIAL_REGISTER_FORM_STYLES: TargetAndTransition = {
    x: "100dvw",
    transition: {
      duration: 0.5,
    },
  };

  const [pageState, setPageState] =
    useState<(typeof PAGE_STATES_VALUES)[number]>("login");

  useEffect(() => {
    const el = document.getElementById("root-layout");

    if (el) {
      el.classList.toggle("root-layout_on-auth-page");
    }

    return () => {
      if (el) {
        el.classList.toggle("root-layout_on-auth-page");
      }
    };
  }, []);

  const contentWrapperClassNames = classnames("auth-page__content-wrapper", {
    "auth-page__content-wrapper_register": pageState === "register",
  });
  return (
    <div className="auth-page">
      <Seo
        title="Авторизация"
        description="Страница регистрации и входа в платформу для создания и проведения квестов и контрольных мероприятий."
        canonical="/auth"
      />
      <div>
        <Typography.Title level={1} className="auth-page__title">
          EduPlay
        </Typography.Title>
        <Typography.Paragraph className="auth-page__description" italic>
          Платформа квестов и интерактивных событий
        </Typography.Paragraph>
      </div>
      <div className={contentWrapperClassNames}>
        <Segmented
          data-testid="switch form"
          options={PAGE_STATES.map((state) => {
            return {
              ...state,
              label: <Typography>{state.label}</Typography>,
            };
          })}
          classNames={{
            root: "auth-page__segmented-root",
            label: "auth-page__segmented-label",
          }}
          value={pageState}
          onChange={setPageState}
          block
        />
        <div className="auth-page__form-wrapper">
          <AnimatePresence>
            {pageState === "login" ? (
              <motion.div
                key="login"
                initial={INITIAL_LOGIN_FORM_STYLES}
                animate={{
                  x: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
                exit={INITIAL_LOGIN_FORM_STYLES}
              >
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={INITIAL_REGISTER_FORM_STYLES}
                animate={{
                  x: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
                exit={INITIAL_REGISTER_FORM_STYLES}
              >
                <RegisterForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
