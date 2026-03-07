import type { ChangeTypeOfKeys } from "@/src/shared/lib";
import {
  selectFiltersWindowState,
  setIsFiltersWindowOpen,
} from "@/src/widgets";
import { Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { getParams } from "../lib/paramsLib/getParams";
import type { Filters } from "../model/useAllEvents";
import CreateEventWindow from "./CreateEventWindow/CreateEventWindow";
import EventsList from "./EventsList/EventsList";
import FiltersWindow from "./FiltersWindow/FiltersWindow";
import FloatButtonsGroup from "./FloatButtonsGroup/FloatButtonsGroup";
import "./HomePage.scss";
import JoinWithCodeWindow from "./JoinWithCodeWindow/JoinWithCodeWindow";

export const HomePage = () => {
  const [params, setParams] = useSearchParams();

  const [createEventWindowOpen, setIsCreateEventWindoWOpen] = useState(false);

  const [joinWithCodeWindowOpen, setIsJoinWithCodeWindowOpen] = useState(false);

  const filtersWindowOpen = useSelector(selectFiltersWindowState);

  const dispatch = useDispatch();

  const filtersEventWindoWOpen = (value: boolean) => {
    dispatch(setIsFiltersWindowOpen(value));
  };

  const [isButtonsGroupOpened, SetButtonsGroupOpened] = useState(false);

  const preparedParams = getParams(params);

  const handleFiltersChange = (filters: Filters) => {
    const preparedFilters: ChangeTypeOfKeys<
      Filters,
      "decliningRating" | "active" | "favorites",
      string
    > = {
      ...filters,
      decliningRating: String(filters.decliningRating),
      active: String(filters.active),
      favorites: String(filters.favorites),
    };
    setParams((params) => {
      for (const [key, value] of Object.entries(preparedFilters)) {
        if (Array.isArray(value)) {
          if (value.length == 0) {
            params.delete(key);
          }
          for (const elem of value) {
            params.append(key, elem);
          }
        } else {
          if (value === "true") {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        }
      }
      return params;
    });
  };

  return (
    <div className="home-page">
      <div className="home-page__participate-btn-wrapper">
        <Button
          className="home-page__participate-btn"
          onClick={() => setIsJoinWithCodeWindowOpen(true)}
        >
          Присоединиться по коду
        </Button>
      </div>
      <EventsList filters={preparedParams} />
      <FloatButtonsGroup
        setOpen={SetButtonsGroupOpened}
        open={isButtonsGroupOpened}
        setCreateEventWindowOpen={() => setIsCreateEventWindoWOpen(true)}
      />
      <CreateEventWindow
        open={createEventWindowOpen}
        setIsOpen={setIsCreateEventWindoWOpen}
      />
      <FiltersWindow
        open={filtersWindowOpen}
        setIsOpen={filtersEventWindoWOpen}
        filters={preparedParams}
        onFiltersChange={handleFiltersChange}
      />
      <JoinWithCodeWindow
        open={joinWithCodeWindowOpen}
        setIsOpen={setIsJoinWithCodeWindowOpen}
      />
    </div>
  );
};
