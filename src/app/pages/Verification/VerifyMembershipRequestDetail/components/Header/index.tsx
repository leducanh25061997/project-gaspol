/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import { Stack, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Icon } from '@iconify/react';
import { useNavigate, Link } from 'react-router-dom';
import path from 'app/routes/path';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  onEdit?: () => void;
}

export const Header = memo((props: Props) => {
  const { onEdit } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          fontWeight: 700,
          fontSize: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#777777',
        }}
      >
        <Stack
          sx={{
            display: 'inline',
          }}
        >
          <IconButton component={Link} to={path.verifyIndividualMember}>
            <ArrowBackIcon />
          </IconButton>
          {t(translations.verifyMembershipDetailPage.title)}
        </Stack>
        <Button
          variant="contained"
          startIcon={<Icon fontSize="large" icon="mdi:pencil" />}
          onClick={onEdit}
        >
          {t(translations.common.edit)}
        </Button>
      </Box>
    </Stack>
  );
});
