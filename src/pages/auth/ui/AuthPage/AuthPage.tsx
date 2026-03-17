import { PageMeta, useTitle } from "@/src/shared/lib";
import { Segmented, Typography } from "antd";
import { useEffect, useState } from "react";
import { PAGE_STATES, PAGE_STATES_VALUES } from "../../const/pageStates";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./AuthPage.scss";
export const AuthPage = () => {
  useTitle("Авторизация");

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
  return (
    <div className="auth-page">
      <PageMeta
        title="EduPlay – Авторизация"
        description="Страница регистрации и входа"
      />
      <div className="auth-page__content-wrapper">
        <Segmented
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
          {pageState === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};
