import type { RootState } from "@/src/shared/lib";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BlockReorderingState {
  value: boolean;
}

const initialState: BlockReorderingState = {
  value: false,
};

export const blockReorderingSlice = createSlice({
  name: "blockReordering",
  initialState,
  reducers: {
    setBlockReorderingState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setBlockReorderingState } = blockReorderingSlice.actions;

export const selectBlockReorderingState = (state: RootState) =>
  state.blockReorderingState.value;

export default blockReorderingSlice.reducer;
