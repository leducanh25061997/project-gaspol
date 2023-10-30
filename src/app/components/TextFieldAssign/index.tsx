import React from 'react';
import { Typography, styled, IconButton } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  handleOpen: () => void;
}

const GeneralClubManagementRoot = styled('div')({
  padding: '15px 10px 13px 17px',
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiTypography-root': {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiButtonBase-root': {
    padding: '0px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

export const TextFieldAssign = (props: Props) => {
  const { title, handleOpen } = props;
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <GeneralClubManagementRoot onClick={handleOpen}>
        <Typography>{title}</Typography>
        <IconButton
          sx={{
            position: 'relative',
            bgcolor: 'white',
          }}
          component="span"
          children={<ArrowRightIcon />}
        />
      </GeneralClubManagementRoot>
    </React.Fragment>
  );
};
