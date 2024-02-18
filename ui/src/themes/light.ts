import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#5f8bb7'
    },
    secondary: {
      main: '#fdda64',
      dark: '#ddb52f'
    }
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#a2821a' // Darker yellow when the switch is checked
          }
        }
      }
    }
  }
});
