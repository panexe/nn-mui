import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },

  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  },

  components: {
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          height: '100%',
        }
      }
    }, 

    MuiToolbar:{
      styleOverrides: {
        root:{
          minHeight: '0',
          '@media (min-height: 600px)': {
            minHeight: '0'
          }
        },
        regular:{
          minHeight: '24px',
        },
        gutters:{
          minHeight: '24px',
        }
      }
    }
  }

});

export default theme;
