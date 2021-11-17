import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface datasetState {
  tabIndex: number;
  colorMode: PaletteMode;
}

const initialState: datasetState = {
  tabIndex: 1,
  colorMode: "dark",
};

const datasetSlice = createSlice({
  name: "dataset",
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

export const datasetActions = datasetSlice.actions;

export default datasetSlice;