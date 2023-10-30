/**
 *
 * Footer
 *
 */
import React, { memo } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Box, Card, Button } from '@mui/material';

interface Props {}

export const Footer = memo((props: Props) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      <Card sx={{ padding: '12px 24px', textAlign: 'end' }}>
        <Button type="submit" variant="contained">
          {t(translations.common.update)}
        </Button>
      </Card>
    </Box>
  );
});
