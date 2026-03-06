import { IconButton } from "@/src/shared/ui";
import classnames from "classnames";
import { useNavigate } from "react-router";
import { NAVIGATION_BUTTONS_INFO } from "../../const/navigationButtonsInfo";
import "./NavigationButtons.scss";
interface NavigationButtonsProps {
  pathname: string;
}

const NavigationButtons = ({ pathname }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  return (
    <>
      {NAVIGATION_BUTTONS_INFO.map((buttonInfo) => (
        <IconButton
          className={classnames("action-btn", {
            "action-btn_active": pathname === buttonInfo.pathname,
          })}
          key={buttonInfo.pathname}
          icon={buttonInfo.icon}
          onClick={() => {
            if (buttonInfo.pathname != pathname) {
              void navigate(buttonInfo.pathname);
            }
          }}
        />
      ))}
    </>
  );
};

export default NavigationButtons;
