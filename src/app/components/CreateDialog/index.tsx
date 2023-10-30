/**
 *
 * ApprovalDialog
 *
 */
import {
  Dialog,
  DialogActions,
  Grid,
  Divider,
  Typography,
  DialogContent,
  DialogContentText,
  Button,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { DialogTitle } from '../DialogTitle';

interface Props {
  open: boolean;
  title?: string;
  description: any;
  onCancel?: () => void;
  onCreate?: () => void;
}

export const CreateDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const { open, title, description, onCancel, onCreate } = props;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="create-dialog-title" onClose={onCancel}>
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '16px',
        }}
      >
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          padding: '12px 16px',
        }}
      >
        <Button onClick={onCancel} color="inherit" variant="outlined">
          {t(translations.components.approvalDialog.cancel)}
        </Button>
        {onCreate && (
          <LoadingButton onClick={onCreate} variant="contained">
            {t(translations.components.approvalDialog.approve)}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
});
