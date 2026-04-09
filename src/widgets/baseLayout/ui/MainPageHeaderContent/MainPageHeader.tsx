import { FiltersSvg, IconButton, Logo } from "@/shared/ui";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { setIsFiltersWindowOpen } from "../../model/filtersWindowState";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import "./MainPageHeader.scss";

export interface MainPageHeaderContentProps {
  pathname: string;
}
const MainPageHeaderContent = ({ pathname }: MainPageHeaderContentProps) => {
  const { Search } = Input;

  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  return (
    <div className="main-page-header-content">
      <Logo />
      <Search
        className="main-page-header-content__search"
        allowClear
        onClear={() => {
          setSearchParams((searchParams) => {
            searchParams.delete("title");
            return searchParams;
          });
        }}
        onSearch={(value) => {
          setSearchParams((searchParams) => {
            searchParams.set("title", value);
            return searchParams;
          });
        }}
      />
      <IconButton
        className="main-page-header-content__action-btn"
        icon={<FiltersSvg />}
        onClick={() => {
          dispatch(setIsFiltersWindowOpen(true));
        }}
      />
      <NavigationButtons pathname={pathname} />
    </div>
  );
};

export default MainPageHeaderContent;
