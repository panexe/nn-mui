import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./components/ui/header/Header";
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
        <Box component="main" sx={{ flexGrow: 1, p: 0 , overflow: 'hidden'}}>
          <TopBar />
          <Main />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
