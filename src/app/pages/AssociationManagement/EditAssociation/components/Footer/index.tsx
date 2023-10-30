/**
 *
 * Footer
 *
 */
import React, { memo } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import BanIcon from 'assets/images/ban.svg';
import UnbanIcon from 'assets/images/unban.svg';

interface Props {
  handleSubmit?: () => void;
  handleBan?: () => void;
  handleUnban?: () => void;
  handleCancel?: () => void;
  isBan?: boolean;
}

export const Footer = memo((props: Props) => {
  const { t } = useTranslation();
  const { handleSubmit, handleBan, isBan, handleCancel } = props;
  return (
    <Box
      sx={{
        marginTop: '24px',
      }}
    >
      <Box sx={{ textAlign: 'end', padding: '12px 24px' }}>
        <Button
          onClick={handleCancel}
          sx={{
            backgroundColor: '#FF6B00',
            color: 'white',
            width: '120px',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#FF6B00',
              opacity: '0.6',
            },
          }}
        >
          {/* <img src={isBan ? BanIcon : UnbanIcon} />
          <span style={{ marginLeft: '0.566rem' }}>
            {isBan ? t(translations.common.ban) : t(translations.common.unban)}
          </span> */}
          {t(translations.common.cancel)}
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: '10px', width: '120px', height: '2.48rem' }}
          onSubmit={handleSubmit}
          type="submit"
        >
          {t(translations.common.update)}
        </Button>
      </Box>
    </Box>
  );
});
