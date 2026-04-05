import type { RootState } from "@/shared/lib";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EventNameState {
  value: string;
}

const initialState: EventNameState = {
  value: "",
};

export const eventNameSlice = createSlice({
  name: "eventName",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setName } = eventNameSlice.actions;

export const selectEventName = (state: RootState) => state.eventName.value;

export default eventNameSlice.reducer;
