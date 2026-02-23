import type { RootState } from "@/src/shared/lib"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface TaskReorderingState {
  value: boolean;
}

const initialState: TaskReorderingState = {
  value: false,
};

export const tasksReorderingSlice = createSlice({
  name: "taskReorderingState",
  initialState,
  reducers: {
    setTasksReorderingState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setTasksReorderingState } =
  tasksReorderingSlice.actions;

export const selectTasksReorderingState = (state: RootState) =>
  state.tasksReorderingState.value;

export default tasksReorderingSlice.reducer;
