import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/mdi/magnify';
import trash2Fill from '@iconify-icons/mdi/delete';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { useRef, useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  Autocomplete,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Checkbox,
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 80,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
}));

interface Props {
  numSelected: number;
  filterName: string;
  placeholder?: string;
  onFilterName: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onChecked: (event: any) => void;
  filterList: any[];
  isAllowFillter: boolean;
  width?: number;
}

export default function TableToolbar(props: Props) {
  const {
    numSelected,
    filterName,
    placeholder = '',
    onFilterName,
    onKeyPress,
    onChecked,
    filterList,
    isAllowFillter,
    width = 240,
  } = props;
  const theme = useTheme();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Autocomplete
          freeSolo
          options={[]}
          onChange={onFilterName}
          onInputChange={onFilterName}
          value={filterName || ''}
          onKeyPress={onKeyPress}
          renderInput={params => (
            <TextField
              placeholder={placeholder}
              sx={{
                width,
                transition: theme.transitions.create(['box-shadow', 'width'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
                '&.Mui-focused': {
                  width: 320,
                  boxShadow: theme.customShadows.z8,
                },
                '& fieldset': {
                  borderWidth: `1px !important`,
                  borderColor: `${theme.palette.grey[500_32]} !important`,
                },
              }}
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: 'text.disabled' }}
                      />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}

      {numSelected > 0 ? (
        <Grid title="Delete">
          <IconButton ref={ref} onClick={() => setIsOpen(true)}>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Grid>
      ) : (
        isAllowFillter && (
          <Grid title="Filter list">
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
              <Icon icon={roundFilterList} />
            </IconButton>
            <Menu
              open={isOpen}
              anchorEl={ref.current}
              onClose={() => setIsOpen(false)}
              PaperProps={{
                sx: { width: 200, maxWidth: '100%' },
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {filterList.map(item => (
                <MenuItem
                  sx={{ color: 'text.secondary' }}
                  onClick={event => {
                    onChecked(item.value);
                    setIsOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => {
                        onChecked(item.value);
                        setIsOpen(false);
                      }}
                      checked={item.isChecked}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        )
      )}
    </RootStyle>
  );
}
