/**
 *
 * Logo
 *
 */
import { Typography, Box } from '@mui/material';
import LoadingIcon from 'assets/images/loading.svg';
import { translations } from 'locales/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './loading.css';

interface props {
  isLoading?: boolean;
  updated?: boolean;
}

export function Loading(props: props) {
  const { isLoading, updated } = props;
  const { t } = useTranslation();
  return !isLoading ? (
    <Box
      sx={{
        background: '#F0F0F0',
        color: '#868686',
        width: '184px',
        height: '75px',
        textAlign: 'center',
        paddingTop: '1rem',
        float: 'right',
        marginTop: 2,
        position: 'fixed',
        bottom: '0px',
        right: updated ? '1.4rem' : '2.4rem',
      }}
    >
      <img className="image" src={LoadingIcon} />
      <div>{t(translations.common.loading)}</div>
    </Box>
  ) : (
    <></>
  );
}
