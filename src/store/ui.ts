import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabIndex: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setTab(state, action) {
        state.tabIndex = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;