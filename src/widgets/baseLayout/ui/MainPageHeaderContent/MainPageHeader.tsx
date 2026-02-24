import { FiltersSvg, IconButton, Logo } from "@/src/shared/ui";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { setIsFiltersWindowOpen } from "../../model/filtersWindowState";
import "./MainPageHeader.scss";
const MainPageHeaderContent = () => {
  const { Search } = Input;

  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  return (
    <div className="main-page-header-content">
      <Logo />
      <Search
        className="main-page-header-content__search"
        onSearch={(value) => {
          setSearchParams((searchParams) => {
            searchParams.set("title", value);
            return searchParams;
          });
        }}
      />
      <IconButton
        className="main-page-header-content__filters-btn"
        icon={<FiltersSvg />}
        onClick={() => {
          dispatch(setIsFiltersWindowOpen(true));
        }}
      />
    </div>
  );
};

export default MainPageHeaderContent;
