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
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Close as CloseIcon } from '@mui/icons-material';

import warningIcon from '../../../assets/images/warning-icon.svg';
import { DialogTitle } from '../DialogTitle';

export const TitleDialogStyle = styled('span')({
  display: 'flex',
  flexDirection: 'row',
  '& img': {
    marginRight: 13,
  },
});
interface Props {
  loading?: boolean;
  open: boolean;
  isConfirmDialog?: boolean;
  title?: string;
  description: any;
  onCancel?: () => void;
  onApprove?: () => void;
}

export const ApprovalDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const {
    open,
    title,
    description,
    onCancel,
    onApprove,
    isConfirmDialog,
    loading,
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
        <TitleDialogStyle>
          {isConfirmDialog ? <img src={warningIcon} alt="warning" /> : ''}{' '}
          {title}
        </TitleDialogStyle>
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
          {isConfirmDialog
            ? t('components.approvalDialog.no')
            : t('components.approvalDialog.cancel')}
        </Button>
        {onApprove && (
          <LoadingButton
            onClick={onApprove}
            variant="contained"
            loading={loading}
          >
            {isConfirmDialog
              ? t('components.approvalDialog.yes')
              : t('components.approvalDialog.approve')}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
});
