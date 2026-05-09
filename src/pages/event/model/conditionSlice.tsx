import type { Condition } from "@/entities/Block";
import type { RootState } from "@/shared/lib/redux";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface conditionSlice {
  value: Condition | null;
}

const initialState: conditionSlice = {
  value: null,
};

export const conditionDataSlice = createSlice({
  name: "condition",
  initialState,
  reducers: {
    setCondition: (state, action: PayloadAction<Condition | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setCondition } = conditionDataSlice.actions;

export const selectCondition = (state: RootState) => state.conditionData.value;

export default conditionDataSlice.reducer;
