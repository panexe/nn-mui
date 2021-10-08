import * as React from "react";
import Box from "@mui/material/Box";
import Header from "./components/ui/header/Header";
import AppContextProvider from "./components/context-providers/AppContextProvider";
import Main from "./components/ui/main/Main";



export default function App() {
  return (
    <AppContextProvider>
      <Box sx={{ display: 'flex' }}>
        <Header />
      <Main />
      </Box>
    </AppContextProvider>
  );
}
