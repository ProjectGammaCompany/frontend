import { IconButton } from "@/shared/ui";
import classnames from "classnames";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { NAVIGATION_BUTTONS_INFO } from "../../const/navigationButtonsInfo";
import "./Footer.scss";

interface FooterProps {
  pathname: string;
}

const Footer = ({ pathname }: FooterProps) => {
  const navigate = useNavigate();

  const targetRef = useRef(null);
  return (
    <footer ref={targetRef} className="footer">
      <div className="footer__content">
        {NAVIGATION_BUTTONS_INFO.map((buttonInfo) => (
          <IconButton
            className={classnames("footer__icon-btn", {
              "footer__icon-btn_active": pathname === buttonInfo.pathname,
            })}
            key={buttonInfo.pathname}
            icon={buttonInfo.icon}
            iconWrapperClassname="footer__icon-wrapper"
            onClick={() => {
              if (buttonInfo.pathname != pathname) {
                void navigate(buttonInfo.pathname);
              }
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
