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
      <Box sx={{ textAlign: 'end' }}>
        <Button
          variant="contained"
          sx={{ marginLeft: '10px', width: '10rem', height: '3rem' }}
          onClick={handleSubmit}
          type="submit"
        >
          {t(translations.common.approve)}
        </Button>
      </Box>
    </Box>
  );
});
