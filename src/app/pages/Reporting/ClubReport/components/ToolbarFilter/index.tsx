import { SearchInput } from 'app/components/SearchInput';
import { translations } from 'locales/translations';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// material
import { styled } from '@mui/material/styles';

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Toolbar,
} from '@mui/material';
import { set, unset } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FilterListParams, Province } from 'types';

import { useClubReportSlice } from '../../slice';
import { selectClubReport } from '../../slice/selectors';
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
  packageType: string[];
  enrollmentType: string[];
}
interface Props {
  keyword?: string;
  placeholder?: string;
  handleSearch: () => void;
  onSearch: (value: string) => void;
  provinces?: Province[];
  currentProvince?: Province;
  onChangeProvince?: (province?: Province) => void;
  onClearFilter?: () => void;
  provinceId?: any;
  user?: any;
  searchValue: string;
  filter: FilterListParams;
}

export default function TableToolbar(props: Props) {
  const {
    keyword,
    placeholder = '',
    handleSearch,
    onSearch,
    provinces,
    currentProvince,
    onChangeProvince,
    onClearFilter,
    provinceId,
    user,
    searchValue,
    filter,
  } = props;
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useClubReportSlice();
  const { isLoadingExportTKTClub } = useSelector(selectClubReport);

  const onChange = (province?: Province | null) => {
    if (province && onChangeProvince) {
      onChangeProvince(province);
    }
  };

  const handleExportData = (e: any) => {
    setOpenExportDialog(true);
  };

  const handleExport = (data: any) => {
    const params = { ...filter, clubType: 'IMI_CLUB' };
    if (currentProvince?.id) {
      set(params, 'provinceId', currentProvince?.id);
    } else {
      unset(params, 'provinceId');
    }
    dispatch(actions.exportTKTClub(params));
  };

  useEffect(() => {
    if (!isLoadingExportTKTClub) {
      setOpenExportDialog(false);
    }
  }, [isLoadingExportTKTClub]);

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
          defaultValue={searchValue}
        ></SearchInput>
        <Button
          variant="contained"
          sx={{
            marginLeft: '1rem',
            backgroundColor: '#01AB55',
            color: 'white',
            width: '100px',
            height: '41px',
          }}
          onClick={handleSearch}
        >
          {t(translations.common.search)}
        </Button>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF6B00',
            color: 'white',
            marginRight: '12px',
            height: '41px',
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
                height: '41px',
                width: '110px',
              }}
              onClick={e => {
                handleExportData(e);
              }}
            >
              {t(translations.common.export)}
            </Button>
          )}
      </Grid>
      <ExportExCel
        isLoading={isLoadingExportTKTClub}
        openDialog={openExportDialog}
        onCancel={() => setOpenExportDialog(false)}
        onSubmit={handleExport}
      />
    </RootStyle>
  );
}
