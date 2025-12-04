import type { ReactNode } from "react";
import "./Header.scss";

interface HeaderProps {
  children: ReactNode | null;
}

const Header = ({ children }: HeaderProps) => {
  return <header className="header">{children}</header>;
};

export default Header;
