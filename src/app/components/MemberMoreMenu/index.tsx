import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
interface Props {
  items: {
    name: string;
    link?: string;
    icon: string;
    itemComponent: React.ElementType<any>;
    onClick?: any;
  }[];
}

export default function UserMoreMenu(props: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div onClick={e => e.stopPropagation()}>
      <IconButton
        ref={ref}
        onClick={e => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <Icon icon="mdi:dots-vertical" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 250, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {props?.items?.map(item => (
          <MenuItem
            key={item.name}
            component={item.itemComponent}
            to={item?.link}
            sx={{ color: 'text.secondary' }}
            onClick={
              item?.onClick
                ? item.onClick
                : () => {
                    return 0;
                  }
            }
          >
            <ListItemIcon>
              <Icon icon={item.icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
