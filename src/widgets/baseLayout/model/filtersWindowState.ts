import type { RootState } from "@/shared/lib";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterWindowsState {
  open: boolean;
}

const initialState: FilterWindowsState = {
  open: false,
};

export const filtersWindowSlice = createSlice({
  name: "filtersWindowState",
  initialState,
  reducers: {
    setIsFiltersWindowOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setIsFiltersWindowOpen } = filtersWindowSlice.actions;

export const selectFiltersWindowState = (state: RootState) =>
  state.filtersWindowState.open;

export default filtersWindowSlice.reducer;
