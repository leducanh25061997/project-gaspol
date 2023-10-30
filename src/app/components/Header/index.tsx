/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Box } from '@mui/material';
import { translations } from 'locales/translations';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  navigateTo?: string;
  goBack?: boolean;
}

export const Header = memo((props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Stack
      sx={{
        marginBottom: '20px',
        marginLeft: '24px',
        display: 'inline',
      }}
    >
      <Box
        sx={{
          fontWeight: 700,
          fontSize: '36px',
          display: 'flex',
          justifyContent: 'flex-start',
          color: '#777777',
        }}
      >
        {props.navigateTo && (
          <IconButton component={Link} to={props.navigateTo}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {props.goBack && !props.navigateTo && (
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {props.title}
      </Box>
    </Stack>
  );
});
