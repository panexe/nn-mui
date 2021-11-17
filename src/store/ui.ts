import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  tabIndex: number;
  colorMode: PaletteMode;
}

const initialState: uiState = {
  tabIndex: 1,
  colorMode: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setTab(state, action: PayloadAction<number>) {
      state.tabIndex = action.payload;
    },
    toggleColorMode(state) {
      state.colorMode = state.colorMode === "light" ? "dark" : "light";
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
