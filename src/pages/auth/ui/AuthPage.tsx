import { Segmented, Typography } from "antd";
import { useState } from "react";
import { PAGE_STATES, PAGE_STATES_VALUES } from "../const/pageStates";
import "./AuthPage.scss";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
export const AuthPage = () => {
  const [pageState, setPageState] =
    useState<(typeof PAGE_STATES_VALUES)[number]>("login");
  return (
    <div className="auth-page">
      <div>
        <Segmented
          options={PAGE_STATES.map((state) => {
            return {
              ...state,
              label: <Typography>{state.label}</Typography>,
            };
          })}
          value={pageState}
          onChange={setPageState}
          block
        />
      </div>
      {pageState === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
