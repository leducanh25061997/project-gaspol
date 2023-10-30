import { useRef, useState, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';

import MenuPopover from '../MenuPopover';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const LANGS = useMemo(
    () => [
      {
        value: 'en',
        label: t('language.english'),
        icon: '/static/icons/united-kingdom.svg',
      },
      {
        value: 'id',
        label: t('language.indonesian'),
        icon: '/static/icons/indonesia.svg',
      },
    ],
    [t],
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const currentLanguage = useMemo(() => {
    return LANGS.find(lang => i18n.language === lang.value) || LANGS[0];
  }, [i18n.language, LANGS]);

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
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity,
              ),
          }),
        }}
      >
        <img
          src={currentLanguage.icon}
          alt={currentLanguage.label}
          width={28}
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === i18n.language}
              onClick={() => handleChangeLanguage(option.value)}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box
                  component="img"
                  alt={option.label}
                  src={option.icon}
                  width={28}
                />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'body2' }}
                data-language={option.value}
              >
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
