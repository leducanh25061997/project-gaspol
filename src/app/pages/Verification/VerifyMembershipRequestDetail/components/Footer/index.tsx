/**
 *
 * Footer
 *
 */
import React, { memo } from 'react';
import { Box, Card, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  onSetApprovalDialogOpen: () => void;
}

export const Footer = memo((props: Props) => {
  const { t } = useTranslation();
  const { onSetApprovalDialogOpen } = props;
  return (
    <Box
      sx={{
        marginTop: '24px',
      }}
    >
      <Card sx={{ textAlign: 'end', padding: '12px 24px' }}>
        <Button
          variant="contained"
          sx={{ marginLeft: '10px' }}
          onClick={onSetApprovalDialogOpen}
        >
          {t(translations.common.approve)}
        </Button>
      </Card>
    </Box>
  );
});
