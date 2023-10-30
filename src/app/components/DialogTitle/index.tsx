/**
 *
 * DialogTitle
 *
 */
import React, { memo } from 'react';
import {
  DialogTitle as MuiDialogTitle,
  IconButton,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface Props {
  id: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const DialogTitle = memo((props: Props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      {...other}
      sx={{ position: 'relative', padding: '12px 16px' }}
    >
      <Grid container>
        <Grid item>
          <Typography
            display="inline"
            sx={{
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            {children}
          </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item xs />
      </Grid>
      <IconButton
        sx={{ position: 'absolute', top: 4, right: 4 }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});
