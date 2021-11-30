import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  tabIndex: number;
  colorMode: PaletteMode;
  loading: boolean;
  loadingMessage: string;
  dragging: boolean;
}

const initialState: uiState = {
  tabIndex: 1,
  colorMode: "dark",
  loading: false,
  loadingMessage: "",
  dragging: false,
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
    startLoading(state, action: PayloadAction<string>) {
      state.loading = true;
      state.loadingMessage = action.payload;
    },
    stopLoading(state) {
      state.loading = false;
      state.loadingMessage = "";
    },
    startDragging(state){
      state.dragging = true;
    }, 
    stopDragging(state){
      state.dragging = false;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
