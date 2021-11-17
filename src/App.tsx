import * as React from "react";
import Box from "@mui/material/Box";
import Main from "./components/ui/main/Main";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "./theme";
import VariableDrawer from "./components/ui/drawer/VariableDrawer";
import TopBar from "./components/ui/header/TopBar";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function App() {
  const mode : PaletteMode = useSelector<RootState>((state) => state.ui.colorMode) as PaletteMode;

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CssBaseline />
        <VariableDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 0, overflowY: "hidden" }}>
          <TopBar />
          <Main />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
