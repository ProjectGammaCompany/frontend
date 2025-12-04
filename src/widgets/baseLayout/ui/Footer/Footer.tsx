import { IconButton } from "@/src/shared/ui";
import classnames from "classnames";
import { useNavigate } from "react-router";
import { FOOTER_BUTTONS_INFO } from "../../const/footerButtonsInfo";
import "./Footer.scss";

interface FooterProps {
  pathname: string;
}

const Footer = ({ pathname }: FooterProps) => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      {FOOTER_BUTTONS_INFO.map((buttonInfo) => (
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
    </footer>
  );
};

export default Footer;
