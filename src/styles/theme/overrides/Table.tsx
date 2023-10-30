import { Theme } from '@mui/material';

export default function Table(theme: Theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 14,
          color: theme.palette.common.black,
          '& .MuiTypography-root': {
            fontSize: 14,
          },
        },
      },
    },
  };
}
