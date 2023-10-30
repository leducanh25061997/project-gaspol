/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import { Stack, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {}

export const Header = memo((props: Props) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Box
        sx={{
          fontWeight: 700,
          fontSize: '36px',
          color: '#777777',
        }}
      >
        {t(translations.sidebar.editAssociationInfo)}
      </Box>
    </Stack>
  );
});
