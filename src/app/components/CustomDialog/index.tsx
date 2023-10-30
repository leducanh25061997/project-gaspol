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
  styled,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Close as CloseIcon } from '@mui/icons-material';

import { DialogTitle } from '../DialogTitle';

interface Props {
  open: boolean;
  cancelBtn?: boolean;
  title?: string;
  labelActionBtn?: string;
  content: ReactNode;
  onCancel?: () => void;
  onAction?: () => void;
}

export const CustomDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const {
    open,
    title,
    content,
    onCancel,
    onAction,
    labelActionBtn,
    cancelBtn,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="approval-dialog-title" onClose={onCancel}>
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '16px',
        }}
      >
        {content}
      </DialogContent>
      <Divider />
      {(onAction || cancelBtn) && (
        <DialogActions
          sx={{
            padding: '12px 16px',
          }}
        >
          {cancelBtn && (
            <Button onClick={onCancel} color="inherit" variant="outlined">
              {t('components.approvalDialog.no')}
            </Button>
          )}
          {onAction && (
            <LoadingButton onClick={onAction} variant="contained">
              {labelActionBtn}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
});
