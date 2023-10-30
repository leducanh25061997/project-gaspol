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
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { DialogTitle } from 'app/components/DialogTitle';
import { Key, Row, Value } from 'app/components/KeyValue';
import { OldMemberListType } from 'types/ClaimList';

interface Props {
  open: boolean;
  title?: string;
  description: any;
  activeMemberData?: any;
  onCancel?: () => void;
  onCreate?: () => void;
}

export const ActiveDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const { open, title, description, activeMemberData, onCancel, onCreate } =
    props;
  const KV = styled('div')({
    color: '#637381',
    marginRight: '3rem',
    fontSize: '14px',
    width: '30%',
  });
  const Value = styled('div')({
    fontSize: '14px',
  });
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
        <Row>
          <KV>{t(translations.claimManagement.package)}</KV>
          <Value>: {activeMemberData?.packageName}</Value>
        </Row>
        <Row>
          <KV>{t(translations.claimManagement.memberName)}</KV>
          <Value>: {activeMemberData?.fullName}</Value>
        </Row>
        <Row>
          <KV>{t(translations.claimManagement.expiredDate)}</KV>
          <Value>
            :{' '}
            {moment(activeMemberData?.registerTime).format('DD/MM/YYYY HH:mm')}
          </Value>
        </Row>
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
            {t(translations.common.confirm)}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
});
