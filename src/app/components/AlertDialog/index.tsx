/**
 *
 * AlertDialog
 *
 */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

import { DialogTitle } from '../DialogTitle';

interface Props {
  open: boolean;
  title?: string;
  description: any;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const AlertDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const { open, title, description, onCancel, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" onClose={onCancel}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          padding: '12px 16px',
        }}
      >
        {onCancel && (
          <Button onClick={onCancel} color="inherit" variant="outlined">
            {t('components.alertDialog.cancel')}
          </Button>
        )}
        {onConfirm && (
          <LoadingButton onClick={onConfirm} variant="contained">
            {t('components.alertDialog.agree')}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
});
