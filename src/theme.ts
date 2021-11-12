import { createTheme } from "@mui/material/styles";
import { lightBlue, red } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import { amber, grey, lightGreen } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          border: "1px solid",
          borderRadius: "4px",
          backgroundColor: "#1D1B29",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: 0,
          "&.Mui-expanded": { margin: 0 },
          "&::before": {
            backgroundColor: "#ffffff00",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            minHeight: "48px",
          },
        },
        content: {
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: { root: { paddingTop: 0 } },
    },
  },

  typography: {
    fontFamily: ["Roboto Mono"].join(","),
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: lightBlue,
          divider: "#00000033",
          background: {
            default: "#171621",
            paper: "#DED6C3",
          },
          text: {
            primary: "#5A4C2B",
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: lightGreen,
          divider: "#FFFFFF33",
          background: {
            default: "#171621",
            paper: "#1D1B29",
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },

  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', "sans-serif"].join(","),
  },

  components: {
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          height: "100%",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "0",
          "@media (min-height: 600px)": {
            minHeight: "0",
          },
        },
        regular: {
          minHeight: "24px",
        },
        gutters: {
          minHeight: "24px",
        },
      },
    },
  },
});

export default theme;
