/**
 *
 * Header
 *
 */

import { Stack, Box } from '@mui/material';
import React, { memo } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import path from 'app/routes/path';

interface Props {
  id: any;
}

export const Header = memo((props: Props) => {
  const { id } = props;
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        marginLeft: '24px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <IconButton
        sx={{ ml: -2, mr: 2 }}
        component={Link}
        to={path.verifyIndividualMember + `/${id}`}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#777777',
        }}
      >
        {t(translations.VerifyMembershipEdit.title)}
      </Box>
    </Stack>
  );
});
