import React, { useEffect, useState } from 'react';
import { Typography, styled, IconButton } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { translations } from 'locales/translations';

import { useTranslation } from 'react-i18next';

import { ApprovalDialog } from '../ApprovalDialog';

interface Props {
  title: string;
  extra: any;
}

const GeneralClubManagementRoot = styled('div')({
  padding: '16px 10px 16px 17px',
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

export const GeneralClubManagement = (props: Props) => {
  const { title, extra } = props;
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleApprove = () => {};

  return (
    <React.Fragment>
      <GeneralClubManagementRoot onClick={handleOpen}>
        <Typography>Club Admin *</Typography>
        <IconButton
          sx={{
            position: 'relative',
            bgcolor: 'white',
          }}
          component="span"
          children={<ArrowRightIcon />}
        />
      </GeneralClubManagementRoot>
      <ApprovalDialog
        open={openDialog}
        title={title}
        description={extra}
        onCancel={() => setOpenDialog(false)}
        onApprove={handleApprove}
      />
    </React.Fragment>
  );
};
