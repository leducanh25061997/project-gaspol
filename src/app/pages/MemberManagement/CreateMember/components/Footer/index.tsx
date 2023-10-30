/**
 *
 * Footer
 *
 */
import React, { memo } from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  handleSubmit: () => void;
}

export const Footer = memo((props: Props) => {
  const { t } = useTranslation();
  const { handleSubmit } = props;
  return (
    <Box
      sx={{
        marginTop: '24px',
      }}
    >
      <Box sx={{ textAlign: 'end', padding: '12px 24px' }}>
        <Button
          variant="contained"
          sx={{ marginLeft: '10px' }}
          onSubmit={handleSubmit}
          type="submit"
        >
          {t(translations.common.create)}
        </Button>
      </Box>
    </Box>
  );
});
