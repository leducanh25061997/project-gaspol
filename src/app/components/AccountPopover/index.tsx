import React, { useMemo, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';
import { useAuthSlice } from 'app/pages/Auth/slice';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import membersIcon from '../../../assets/images/member-icon.svg';
import settingIcon from '../../../assets/images/settings.svg';
import userMngtIcon from '../../../assets/images/user_mnt.svg';
import logoutIcon from '../../../assets/images/logoutIcon.svg';

import MenuPopover from '../MenuPopover';

const MenuItemStyle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& .menu_item__icon': {
    width: 29,
    marginRight: 10,
  },
  '& .menu-color': {
    color: '#777777',
    fontWeight: 600,
  },
});

const MenuListStyle = styled('div')({
  '& .MuiMenuItem-root:hover': {
    borderRadius: 10,
  },
});

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const getIcon = (name: string) => (
    <img src={name} alt="" style={{ color: 'white' }} />
  );

  const MENU_OPTIONS = useMemo(() => {
    return [
      // {
      //   id: 'profile',
      //   label: 'Profile',
      //   linkTo: '#',
      //   icon: getIcon(membersIcon),
      // },
      // {
      //   id: 'setting',
      //   label: 'Setting',
      //   linkTo: '/setting',
      //   icon: getIcon(settingIcon),
      // },
      {
        id: 'usrMnt',
        label: t(translations.common.userMng),
        linkTo:
          'https://keycloak.gaspol.co.id/auth/admin/master/console/#/realms/dev.imi',
        icon: getIcon(userMngtIcon),
      },
    ];
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLinkTo = (id: string, link: string) => {
    if (id === 'usrMnt') {
      window.open(link);
    } else {
      // navigate(link);
    }
  };
  const handleLogout = React.useCallback(
    e => {
      e.preventDefault();
      setOpen(false);
      dispatch(
        actions.logout('', (err?: any) => {
          if (err) {
            // console.log(err);
          } else {
            window.location.href = path.login;
          }
        }),
      );
    },
    [actions, dispatch],
  );
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src="/" alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Gaspol
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userInformation?.userName}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ my: 1.5, px: 1.25 }}>
          <MenuListStyle>
            {MENU_OPTIONS.map(option => (
              <MenuItem
                key={option.label}
                // to={option.linkTo}
                // component={RouterLink}
                onClick={() => handleLinkTo(option.id, option.linkTo)}
                sx={{ typography: 'body2', py: 2, px: 1.25 }}
              >
                <MenuItemStyle>
                  <div className="menu_item__icon menu-color">
                    {option.icon}
                  </div>
                  <div className="menu_item__name menu-color">
                    {option.label}
                  </div>
                </MenuItemStyle>
              </MenuItem>
            ))}
          </MenuListStyle>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ my: 1.5, px: 2.5 }}>
          <MenuItemStyle
            style={{ cursor: 'pointer' }}
            onClick={e => handleLogout(e)}
          >
            <div className="menu_item__icon menu-color">
              {getIcon(logoutIcon)}
            </div>
            <div className="menu_item__name menu-color">
              {t(translations.loginPage.logout)}
            </div>
          </MenuItemStyle>
          {/* <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button> */}
        </Box>
      </MenuPopover>
    </>
  );
}
