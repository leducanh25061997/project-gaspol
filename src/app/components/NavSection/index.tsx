import React, { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import arrowRightIcon from '@iconify-icons/mdi/chevron-right';
import arrowDownIcon from '@iconify-icons/mdi/chevron-down';

import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import { GPSidebarMenu } from 'types';
import { useTranslation } from 'react-i18next';
import { useRole } from 'app/hooks';
import { Role } from 'types/Role';
// ----------------------------------------------------------------------

const ListItemStyle = styled(props => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
})) as any;

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

interface Props {
  item: GPSidebarMenu;
  active: (path?: string) => boolean;
}

function NavItem(props: Props) {
  const { item, active } = props;
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, children } = item;
  const [open, setOpen] = useState<boolean>(isActiveRoot);
  const { t } = useTranslation();
  const { userHasAtLeastAllowedRoles } = useRole();
  const authorizationChildren = children?.filter(
    child => !child.roles || userHasAtLeastAllowedRoles(child.roles as Role[]),
  );

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const activeRootStyle = {
    '& img': {
      filter:
        'invert(45%) sepia(30%) saturate(5251%) hue-rotate(124deg) brightness(93%) contrast(101%);',
    },
    paddingLeft: '20px',
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity,
    ),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
    paddingLeft: '20px',
  };

  if (authorizationChildren) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
            paddingLeft: '20px',
          }}
        >
          {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
          <ListItemText disableTypography primary={t(title)} />
          <Box
            component={Icon}
            icon={open ? arrowDownIcon : arrowRightIcon}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {authorizationChildren.map(child => {
              const isActiveSub = active(child.path);

              return (
                <ListItemStyle
                  key={child.title}
                  component={RouterLink}
                  to={child.path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                    paddingLeft: '20px',
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: gpTheme =>
                          gpTheme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={t(child.title)} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
        paddingLeft: '20px',
      }}
    >
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemText disableTypography primary={t(title)} />
    </ListItemStyle>
  );
}

interface NavSectionProps {
  navConfig: GPSidebarMenu[];
  [prop: string]: any;
}

export default function NavSection(props: NavSectionProps) {
  const { navConfig, ...other } = props;
  const { pathname } = useLocation();
  const match = (path?: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  const { userHasAtLeastAllowedRoles } = useRole();

  const authorizationNavConfig = navConfig.filter(
    item => !item.roles || userHasAtLeastAllowedRoles(item.roles || []),
  );

  return (
    <Box {...other}>
      <List disablePadding>
        {authorizationNavConfig.map(item => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
