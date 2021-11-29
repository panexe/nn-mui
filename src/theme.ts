import { createTheme } from "@mui/material/styles";
import { lightBlue, red } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";

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
          primary: {
            main: '#005AC5',
            light: '#D7E2FF',
            dark: '#001944',
          },
          secondary: {
            main: '#575E71',
            light: '#DBE2F9',
            dark: '#141B2C',
            contrastText: '#ffffff',
          },
          background: {
            default: '#FDFBFF',
            paper: '#F0F2FC',
          },
          text: {
            primary: '#1B1B1E',
            secondary: '#44464E',
            disabled: 'rgba(27,27,30,0.38)',
            hint: 'rgba(27,27,30,0.38)',
          },
          error: {
            main: '#BA1B1B',
            light: '#FFDAD4',
            dark: '#410001',
          },
          divider: '#75777F',
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#ACC6FF',
            contrastText: '#002D6D',
            dark: '#004299',
            light: '#D7E2FF',
          },
          secondary: {
            main: '#DEBBDE',
            contrastText: '#402743',
            light: '#FCD7FB',
            dark: '#583E5A',
          },
          background: {
            default: '#1B1B1E',
            paper: '#232429',
          },
          text: {
            primary: '#E4E2E6',
            secondary: '#C5C6D0',
            disabled: 'rgba(227,227,227,0.38)',
          },
          error: {
            main: '#F2B8B5',
            contrastText: '#601410',
            light: '#F9DEDC',
            dark: '#8C1D18',
          },
          divider: '#938F99',
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
