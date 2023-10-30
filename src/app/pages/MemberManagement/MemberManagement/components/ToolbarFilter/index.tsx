import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/mdi/magnify';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { SearchInput } from 'app/components/SearchInput';

// material
import { styled } from '@mui/material/styles';

import {
  Box,
  Toolbar,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Grid,
  Radio,
  FormControl,
  Button,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Autocomplete,
  TextField,
} from '@mui/material';
import { keyword } from 'chalk';
import { FilterList, Province } from 'types';

import ExportExCel from '../ExportFileExcel';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 80,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
  '& .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': {
    paddingRight: '12px',
  },
}));

interface ValueFilter {
  status: string[];
  packageCode: string[];
  packageStatus: string[];
}
interface Props {
  keyword?: string;
  placeholder?: string;
  handleSearch: () => void;
  onSearch: (value: string) => void;
  onChecked: (event: any) => void;
  filterList: FilterList[];
  provinces?: Province[];
  currentProvince?: Province;
  onChangeProvince?: (province?: Province) => void;
  onClearFilter?: () => void;
  provinceId?: any;
  user?: any;
  oldValueFilter?: ValueFilter;
}

export default function TableToolbar(props: Props) {
  const {
    keyword,
    placeholder = '',
    handleSearch,
    onSearch,
    onChecked,
    filterList,
    provinces,
    currentProvince,
    onChangeProvince,
    onClearFilter,
    provinceId,
    oldValueFilter,
    user,
  } = props;
  const theme = useTheme();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [valueChecked, setValueChecked] = useState({
    packageCode: [''],
    status: [''],
    packageStatus: [''],
  });
  const [listFilter, setListFilter] = useState<FilterList[]>();
  const { t } = useTranslation();

  useEffect(() => {
    if (oldValueFilter) {
      setValueChecked(oldValueFilter);
    }
  }, [oldValueFilter]);

  useEffect(() => {
    setListFilter(filterList);
  }, [filterList]);

  const handleApplyFilter = () => {
    onChecked(valueChecked);
    setIsOpen(false);
  };

  const handleChange = (event: string, nameMenu: string) => {
    const newData = listFilter?.map(el =>
      el.name === nameMenu ? { ...el, checked: event } : el,
    );
    setListFilter(newData);
    // setValueChecked({ ...valueChecked, packageCode: event });
  };

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  const handleExportData = (e: any) => {
    setOpenExportDialog(true);
  };

  const handleExport = (data: any) => {
    setOpenExportDialog(false);
  };

  return (
    <RootStyle>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          '& .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':
            {
              py: 0,
            },
          '& .MuiOutlinedInput-root': {
            height: '41px',
          },
        }}
      >
        <Box sx={{ mr: 2 }}>
          <Autocomplete
            sx={{ width: 176 }}
            options={provinces || []}
            getOptionLabel={(item: any | null) =>
              item?.name || t(translations.common.all)
            }
            disabled={provinceId || false}
            value={currentProvince || t(translations.common.all)}
            renderInput={params => (
              <TextField
                {...params}
                label={t(translations.createNewMemberPage.province)}
              />
            )}
            onChange={(_, data: any | null) => {
              onChange(data);
            }}
          />
        </Box>
        <SearchInput
          width={316}
          onSearch={onSearch}
          placeholder={placeholder}
          keyword={keyword}
        ></SearchInput>
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            backgroundColor: '#01AB55',
            color: 'white',
            width: '100px',
          }}
          onClick={handleSearch}
        >
          {t(translations.common.search)}
        </Button>
      </Grid>
      <Grid title="Filter list">
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF6B00',
            color: 'white',
            marginRight: '12px',
          }}
          onClick={onClearFilter}
        >
          {t(translations.common.clearFilter)}
        </Button> */}

        {/* {user &&
          (user.roles.includes('member_list_export') ||
            user.roles.includes('member_list_export_province')) && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#01AB55',
                color: 'white',
              }}
              onClick={e => {
                handleExportData(e);
              }}
            >
              {t(translations.common.export)}
            </Button>
          )} */}

        {/* <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <Icon icon={roundFilterList} />
        </IconButton> */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#01AB55',
            color: 'white',
            marginLeft: '8px',
            height: '41px',
            width: '100px',
          }}
          ref={ref}
          onClick={() => setIsOpen(true)}
        >
          <Icon style={{ width: 20, height: 20 }} icon={roundFilterList} />
          <span style={{ marginLeft: 12 }}>
            {t(translations.common.filter)}
          </span>
        </Button>
        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => {
            setListFilter(filterList);
            setIsOpen(false);
          }}
          PaperProps={{
            sx: { width: 200, maxWidth: '100%' },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {listFilter?.map(item => (
            <FormControl sx={{ marginLeft: '10px' }} key={item.title}>
              <FormLabel
                sx={{
                  color: 'black',
                  fontWeight: 600,
                  fontSize: 20,
                }}
                component="legend"
              >
                {item.title}
              </FormLabel>
              {item.name === 'package'
                ? item.data.map((itemCheckbox: any, index) => (
                    <MenuItem
                      sx={{ color: 'text.secondary', padding: '0px' }}
                      key={index}
                    >
                      <ListItemIcon sx={{ padding: '0px' }}>
                        <Checkbox
                          onChange={event => {
                            const newStatus = item?.packageCode;
                            if (event.target.checked) {
                              if (itemCheckbox.value === '') {
                                newStatus &&
                                  newStatus.length > 0 &&
                                  newStatus.splice(0, newStatus.length);
                              } else {
                                newStatus &&
                                  newStatus.length > 0 &&
                                  newStatus.indexOf('') > -1 &&
                                  newStatus.splice(newStatus.indexOf(''), 1);
                              }
                              newStatus && newStatus.push(itemCheckbox.value);
                            } else {
                              newStatus &&
                                newStatus.indexOf(itemCheckbox.value) > -1 &&
                                newStatus.splice(
                                  newStatus.indexOf(itemCheckbox.value),
                                  1,
                                );
                            }
                            newStatus &&
                              setValueChecked({
                                ...valueChecked,
                                packageCode: newStatus,
                              });
                          }}
                          checked={
                            item?.packageCode &&
                            item?.packageCode?.length === 0 &&
                            (itemCheckbox.value === '' ||
                              itemCheckbox.value === 'All')
                              ? true
                              : item?.packageCode?.includes(itemCheckbox.value)
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ marginLeft: '-1rem' }}
                        primary={itemCheckbox.name}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </MenuItem>
                  ))
                : null}
              {item.name === 'packageStatus'
                ? item.data.map((itemCheckbox: any, index) => (
                    <MenuItem
                      sx={{ color: 'text.secondary', padding: '0px' }}
                      key={index}
                    >
                      <ListItemIcon sx={{ padding: '0px' }}>
                        <Checkbox
                          onChange={event => {
                            const newStatus = item?.status;
                            if (event.target.checked) {
                              if (itemCheckbox.value === '') {
                                newStatus &&
                                  newStatus.length > 0 &&
                                  newStatus.splice(0, newStatus.length);
                              } else {
                                newStatus &&
                                  newStatus.length > 0 &&
                                  newStatus.indexOf('') > -1 &&
                                  newStatus.splice(newStatus.indexOf(''), 1);
                              }
                              newStatus && newStatus.push(itemCheckbox.value);
                            } else {
                              newStatus &&
                                newStatus.indexOf(itemCheckbox.value) > -1 &&
                                newStatus.splice(
                                  newStatus.indexOf(itemCheckbox.value),
                                  1,
                                );
                            }
                            newStatus &&
                              setValueChecked({
                                ...valueChecked,
                                packageStatus: newStatus,
                              });
                          }}
                          checked={
                            item?.status &&
                            item?.status?.length === 0 &&
                            (itemCheckbox.value === '' ||
                              itemCheckbox.value === 'All')
                              ? true
                              : item?.status?.includes(itemCheckbox.value)
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ marginLeft: '-1rem' }}
                        primary={itemCheckbox.name}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </MenuItem>
                  ))
                : null}
              {item.name === 'status'
                ? item.data.map((itemCheckbox: any, index) => (
                    <MenuItem
                      sx={{ color: 'text.secondary', padding: '0px' }}
                      key={index}
                    >
                      <ListItemIcon sx={{ padding: '0px' }}>
                        <Checkbox
                          onChange={event => {
                            const newStatus = item?.status;
                            if (event.target.checked) {
                              if (itemCheckbox.value === '') {
                                newStatus &&
                                  newStatus.length > 0 &&
                                  newStatus.splice(0, newStatus.length);
                              } else {
                                newStatus &&
                                  newStatus.length > 0 &&
                                  newStatus.indexOf('') > -1 &&
                                  newStatus.splice(newStatus.indexOf(''), 1);
                              }
                              newStatus && newStatus.push(itemCheckbox.value);
                            } else {
                              newStatus &&
                                newStatus.indexOf(itemCheckbox.value) > -1 &&
                                newStatus.splice(
                                  newStatus.indexOf(itemCheckbox.value),
                                  1,
                                );
                            }
                            newStatus &&
                              setValueChecked({
                                ...valueChecked,
                                status: newStatus,
                              });
                          }}
                          checked={
                            item?.status &&
                            item?.status?.length === 0 &&
                            (itemCheckbox.value === '' ||
                              itemCheckbox.value === 'All')
                              ? true
                              : item?.status?.includes(itemCheckbox.value)
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ marginLeft: '-1rem' }}
                        primary={itemCheckbox.name}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </MenuItem>
                  ))
                : null}
            </FormControl>
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '10px',
              marginTop: '10px',
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#01AB55',
                color: 'white',
              }}
              onClick={() => {
                handleApplyFilter();
              }}
            >
              {t(translations.common.apply)}
            </Button>
          </Box>
        </Menu>
      </Grid>
      <ExportExCel
        openDialog={openExportDialog}
        onCancel={() => setOpenExportDialog(false)}
        onSubmit={handleExport}
      />
    </RootStyle>
  );
}
