import React from 'react';
import { Typography, styled, IconButton } from '@mui/material';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useTranslation } from 'react-i18next';

interface Props {
  title?: string;
  handleOpen: () => void;
  name?: string;
  handleRemove?: (id: any) => void;
  role?: string;
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

const ButtonShowPopupRoot = styled('div')({
  padding: '15px 10px 13px 17px',
  border: '0.5px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  '& div': {
    position: 'absolute',
    top: '-9px',
    background: '#FFFFFF',
    padding: '0 10px',
    color: '#637381',
    lineHeight: '1.4375em',
    fontWeight: '400',
    fontSize: '11px !important',
    left: '6px',
  },
  '& .MuiTypography-root': {
    flex: 2,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiButtonBase-root': {
    padding: '0px',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

export const ButtonAssignClub = (props: Props) => {
  const { title, handleOpen, name, handleRemove, role } = props;
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {name ? (
        <ButtonShowPopupRoot>
          <div>{title}</div>
          <Typography onClick={handleOpen}>{name}</Typography>
          <span
            style={{ cursor: 'pointer', marginRight: '4px' }}
            onClick={() => (handleRemove ? handleRemove(role) : undefined)}
          >
            <img
              style={{ width: '16px' }}
              src={window.location.origin + '/images/delete.svg'}
            />
          </span>
        </ButtonShowPopupRoot>
      ) : (
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
      )}
    </React.Fragment>
  );
};
