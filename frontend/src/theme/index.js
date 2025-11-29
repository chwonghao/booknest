// src/theme/index.js
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8, // Add a bit of modern rounding to components
  },
  components: {
    // Example of overriding a specific component's style
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          paddingTop: '10px',
          paddingBottom: '10px',
        }
      },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                }
            }
        }
    }
  },
});

export default theme;
