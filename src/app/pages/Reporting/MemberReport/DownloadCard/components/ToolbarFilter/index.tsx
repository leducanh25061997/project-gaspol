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
import { Club, FilterList, FilterListParams, Province } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';

import ExportExCel from '../ExportFileExcel';
import { useMemberReportSlice } from '../../../slice';
import { selectMemberReport } from '../../../slice/selectors';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  // height: 80,
  display: 'flex',
  marginBottom: '10px',
  justifyContent: 'space-between',
  padding: '0 !important',
  '& .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': {
    paddingRight: '12px',
  },
}));

const CustomGruopButtonAction = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .MuiButton-root:first-child': {
    marginRight: '10px',
  },
  [theme.breakpoints.down(1480)]: {
    flexDirection: 'column',
    '& .MuiButton-root:first-child': {
      marginRight: '0px',
      marginBottom: '10px',
    },
  },
}));

interface ValueFilter {
  packageType: string[];
  enrollmentType: string[];
}
interface Props {
  keyword?: string;
  placeholder?: string;
  handleSearch: () => void;
  onSearch: (value: string) => void;
  provinces?: Province[];
  clubsRequest?: Club[];
  currentProvince?: Province;
  onChangeProvince?: (province?: Province) => void;
  onClearFilter?: () => void;
  provinceId?: any;
  user?: any;
  searchValue: string;
  currentClub?: Club;
  handleOnchangeClub?: (value?: Club) => void;
  filter: FilterListParams;
}

export default function TableToolbar(props: Props) {
  const {
    keyword,
    placeholder = '',
    handleSearch,
    onSearch,
    provinces,
    clubsRequest,
    currentProvince,
    onChangeProvince,
    onClearFilter,
    provinceId,
    user,
    searchValue,
    handleOnchangeClub,
    currentClub,
    filter,
  } = props;
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { isLoadingExportDownloadCard } = useSelector(selectMemberReport);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
      dispatch(
        actions.clubsRequest({
          provinceId: province.id,
        }),
      );
    }
  };

  const onChangeClub = (club?: Club | null) => {
    if (club && handleOnchangeClub) {
      handleOnchangeClub(club);
    }
  };

  const handleExportData = (e: any) => {
    setOpenExportDialog(true);
  };

  const handleExport = (data: any) => {
    dispatch(
      actions.exportDownloadCard({
        ...filter,
        provinceId:
          filter.provinceId || userInformation?.provinceId
            ? userInformation?.provinceId
            : '',
      }),
    );
  };

  useEffect(() => {
    if (!isLoadingExportDownloadCard) {
      setOpenExportDialog(false);
    }
  }, [isLoadingExportDownloadCard]);

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
            sx={{ width: 200 }}
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
        <Box sx={{ mr: 2 }}>
          <Autocomplete
            sx={{ width: 150 }}
            options={clubsRequest || []}
            getOptionLabel={(item: any | null) =>
              item?.clubName || t(translations.common.all)
            }
            // disabled={provinceId || false}
            value={currentClub || t(translations.common.all)}
            renderInput={params => (
              <TextField {...params} label={t(translations.common.club)} />
            )}
            onChange={(_, data: any | null) => {
              onChangeClub(data);
            }}
          />
        </Box>
        <SearchInput
          width={310}
          onSearch={onSearch}
          placeholder={placeholder}
          keyword={keyword}
          defaultValue={searchValue}
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
      <CustomGruopButtonAction>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF6B00',
            color: 'white',
            width: '110px',
          }}
          onClick={onClearFilter}
        >
          {t(translations.common.clearFilter)}
        </Button>
        {user &&
          (user.roles.includes('member_list_export') ||
            user.roles.includes('member_list_export_province')) && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#01AB55',
                color: 'white',
                width: '110px',
              }}
              onClick={e => {
                handleExportData(e);
              }}
            >
              {t(translations.common.export)}
            </Button>
          )}
      </CustomGruopButtonAction>
      <ExportExCel
        isLoading={isLoadingExportDownloadCard}
        openDialog={openExportDialog}
        onCancel={() => setOpenExportDialog(false)}
        onSubmit={handleExport}
      />
    </RootStyle>
  );
}
