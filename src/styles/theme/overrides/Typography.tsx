import { Theme } from '@mui/material';

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: 14,
        },
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
