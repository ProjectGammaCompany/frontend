import type { RootState } from "@/shared/lib/redux";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface taskDataState {
  id: string;
  order: number;
}

const initialState: taskDataState = {
  id: "",
  order: 0,
};

export const taskDataSlice = createSlice({
  name: "taskData",
  initialState,
  reducers: {
    setTaskId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setTaskOrder: (state, action: PayloadAction<number>) => {
      state.order = action.payload;
    },
  },
});

export const { setTaskId, setTaskOrder } = taskDataSlice.actions;

export const selectTaskId = (state: RootState) => state.taskData.id;

export const selectTaskOrder = (state: RootState) => state.taskData.order;

export default taskDataSlice.reducer;
