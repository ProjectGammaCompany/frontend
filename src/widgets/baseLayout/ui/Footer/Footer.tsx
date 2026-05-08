import { IconButton } from "@/shared/ui/IconButton";
import { ConfigProvider } from "antd";
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
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: "var(--light-color)",
                },
              },
            }}
            key={buttonInfo.pathname}
          >
            <IconButton
              className={classnames("footer__icon-btn", {
                "footer__icon-btn_active": pathname === buttonInfo.pathname,
              })}
              icon={buttonInfo.icon}
              iconWrapperClassname="footer__icon-wrapper"
              onClick={() => {
                if (buttonInfo.pathname != pathname) {
                  void navigate(buttonInfo.pathname);
                }
              }}
            />
          </ConfigProvider>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
