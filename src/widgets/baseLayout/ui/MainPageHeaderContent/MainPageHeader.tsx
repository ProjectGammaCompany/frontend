import { FiltersSvg, IconButton, Logo } from "@/src/shared/ui";
import { Input } from "antd";
import "./MainPageHeader.scss";
const MainPageHeaderContent = () => {
  const { Search } = Input;
  return (
    <div className="main-page-header-content">
      <Logo />
      <Search className="main-page-header-content__search" />
      <IconButton
        className="main-page-header-content__filters-btn"
        icon={<FiltersSvg />}
        onClick={() => {
          console.log("click");
        }}
      />
    </div>
  );
};

export default MainPageHeaderContent;
