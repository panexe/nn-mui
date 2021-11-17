import * as React from "react";
import Box from "@mui/material/Box";
import Main from "./components/ui/main/Main";
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "./theme";
import VariableDrawer from "./components/ui/drawer/VariableDrawer";
import TopBar from "./components/ui/header/TopBar";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { createTheme } from '@mui/material/styles';


export default function App() {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const colorModeSelect = useSelector<RootState>((state) => state.ui.colorMode);


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
        <Box component="main" sx={{ flexGrow: 1, p: 0 , overflowY: 'hidden'}}>
          <TopBar />
          <Main />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
