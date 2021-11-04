import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState{
  tabIndex: number;
}

const initialState: uiState = {
    tabIndex: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setTab(state, action: PayloadAction<number>) {
        state.tabIndex = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;