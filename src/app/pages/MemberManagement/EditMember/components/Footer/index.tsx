/**
 *
 * Footer
 *
 */
import React, { memo } from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';
interface Props {
  handleSubmit: () => void;
  handleCancel?: () => void;
}

export const Footer = memo((props: Props) => {
  const { t } = useTranslation();
  const { handleSubmit, handleCancel } = props;
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  return (
    <Box sx={{ textAlign: 'end', marginTop: '24px' }}>
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
        {t(translations.common.cancel)}
      </Button>
      {userInformation &&
      (userInformation?.roles?.includes('member_details_update') ||
        userInformation?.roles?.includes(
          'member_details_update_basic_profile',
        )) ? (
        <Button
          variant="contained"
          sx={{ marginLeft: '10px', width: '120px', height: '2.48rem' }}
          onClick={handleSubmit}
          type="submit"
        >
          {t(translations.common.update)}
        </Button>
      ) : (
        ''
      )}
    </Box>
  );
});
