import { useEffect, useRef, useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/mdi/magnify';
import roundFilterList from '@iconify-icons/mdi/filter-variant';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { SearchBar } from 'app/components/SearchBar';

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
import { Club, FilterList, Province } from 'types';

// import ExportExCel from '../ExportFileExcel';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
  '& .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': {
    paddingRight: '12px',
  },
}));

interface Props {
  width?: string;
  widthAutoComplete?: number;
  keyword?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onSearchClub?: (value: string) => void;
  provinces?: Province[];
  clubs?: Club[];
  currentProvince?: Province;
  currentClub?: Club;
  handleSearch?: () => void;
  onChangeProvince?: (province?: Province) => void;
  onChangeClub?: (club?: Club) => void;
  onClearFilter?: () => void;
  loadMoreClubs?: () => void;
  loadPrevClubs?: () => void;
  provinceId?: string;
}

export default function TableToolbar(props: Props) {
  const {
    keyword,
    placeholder = '',
    onSearch,
    onSearchClub,
    provinces,
    clubs,
    currentProvince,
    currentClub,
    onChangeProvince,
    onChangeClub,
    loadMoreClubs,
    loadPrevClubs,
    widthAutoComplete,
    handleSearch,
    width,
    provinceId,
  } = props;
  const isDisable = useMemo(() => !!provinceId, [provinceId]);
  const { t } = useTranslation();

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  const handleOnChangeClub = (club?: Club | null) => {
    if (club && onChangeClub) {
      onChangeClub(club);
    }
  };

  const timeOutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const handleTypeInput = (event: any) => {
    timeOutIdRef.current && clearTimeout(timeOutIdRef.current);
    timeOutIdRef.current = setTimeout(() => {
      const value = event?.target?.value;
      onSearchClub && onSearchClub(value);
    }, 300);
  };

  return (
    <RootStyle>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          '& .MuiAutocomplete-root .MuiOutlinedInput-root': {
            paddingTop: '5px',
            paddingBottom: '5px',
            height: '41px',
            '& .MuiAutocomplete-input': {
              fontSize: '13px!important',
              paddingLeft: '4px',
              paddingRight: '0',
            },
          },
        }}
      >
        {provinces ? (
          <Box sx={{ mr: { xs: 1, xl: 2 } }}>
            <Autocomplete
              sx={{ width: widthAutoComplete || 160 }}
              options={provinces || []}
              disabled={isDisable}
              getOptionLabel={(item: any | null) =>
                item?.name || t(translations.common.all)
              }
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
        ) : (
          ''
        )}
        {clubs ? (
          <Box sx={{ mr: { xs: 1, xl: 2 } }}>
            <Autocomplete
              // freeSolo
              sx={{ width: widthAutoComplete || 160 }}
              options={clubs || []}
              getOptionLabel={(item: any | null) =>
                item?.clubName || t(translations.common.all)
              }
              value={currentClub || t(translations.common.all)}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t(translations.createNewMemberPage.club)}
                />
              )}
              onChange={(_, data: any | null) => {
                handleOnChangeClub(data);
              }}
              onInputChange={handleTypeInput}
              onKeyPress={handleTypeInput}
              ListboxProps={{
                onScroll: (event: React.SyntheticEvent) => {
                  const listboxNode = event.currentTarget;
                  if (
                    listboxNode.scrollTop + listboxNode.clientHeight ===
                    listboxNode.scrollHeight
                  ) {
                    loadMoreClubs && loadMoreClubs();
                  } else if (listboxNode.scrollTop < 25) {
                    loadPrevClubs && loadPrevClubs();
                  }
                },
              }}
            />
          </Box>
        ) : (
          ''
        )}
        {onSearch && (
          <Box
            sx={{
              mr: { xs: 1, xl: 2 },
              '& input': {
                paddingLeft: '4px',
                paddingRight: '0',
                fontSize: '13px',
              },
            }}
          >
            <SearchBar
              width={width || '220px'}
              onSearch={onSearch}
              placeholder={placeholder}
              keyword={keyword}
            ></SearchBar>
          </Box>
        )}
        {onSearch && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#01AB55',
              color: 'white',
              width: '80px',
              height: '41px',
            }}
            onClick={handleSearch}
          >
            {t(translations.common.search)}
          </Button>
        )}
      </Grid>
    </RootStyle>
  );
}
