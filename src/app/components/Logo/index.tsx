/**
 *
 * Logo
 *
 */
import { Typography, Box } from '@mui/material';
import * as React from 'react';

export function Logo() {
  return (
    <Box
      sx={{
        color: '#FF6B00',
        textAlign: 'end',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '50px',
          lineHeight: 0.75,
          fontFamily: 'Freestyle Script',
        }}
      >
        GASPOL!
      </Typography>
      <Typography sx={{ fontSize: '11px' }} component="span">
        By IMI
      </Typography>
    </Box>
  );
}
