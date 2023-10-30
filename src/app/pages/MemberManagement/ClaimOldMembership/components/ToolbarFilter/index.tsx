import { SearchBar } from 'app/components/SearchBar';
import { SearchInput } from 'app/components/SearchInput';
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { translations } from 'locales/translations';
import {
  Button,
  Grid,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';
import exportIcon from '@iconify-icons/mdi/export';
import DateRangeComponent from 'app/components/DateRangeComponent';
import moment from 'moment';
import { CustomDialog } from 'app/components/CustomDialog';
import { LoadingButton, DateRange } from '@mui/lab';

import { Province } from 'types';
import { Role } from 'types/Role';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { selectClaimedClubList } from 'app/pages/ClubManagement/ClaimClub/ClaimedClubList/slice/selectors';

import AuthorizationWrapper from 'app/components/AuthorizationWrapper';

import { FilterStatusType, FilterParams } from '../../slice/types';

import { useClaimListSlice } from '../../slice';

import FilterButton from '../FilterButton';

const RootContainer = styled.div`
  .search {
    min-width: 400px;
  }
`;

type DateRangeProps = {
  fromDate: string | number;
  toDate: string | number;
};

interface Props {
  onFilterToQueryString: (values?: FilterParams) => void;
  filterParams: FilterParams;
  provinceId: string;
  exporting?: boolean;
}

const ToolbarFilter = memo((props: Props) => {
  const { onFilterToQueryString, filterParams, provinceId, exporting } = props;
  const dispatch = useDispatch();
  const { actions } = useClaimListSlice();
  const { provinces } = useSelector(selectClaimedClubList);
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentProvince, setCurrentProvince] = useState<
    Province | undefined
  >();
  const [newProvinces, setNewProvinces] = useState<Province[] | undefined>([]);
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    fromDate: '',
    toDate: '',
  });
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);
  const [status, setStatus] = useState<FilterStatusType | undefined>();
  const [isOpenExportConfirm, setOpenExportConfirm] = useState(false);

  useEffect(() => {
    if (filterParams?.provinceId) {
      const newProvince = provinces?.find(
        province => Number(province.id) === Number(filterParams.provinceId),
      );
      setCurrentProvince(newProvince);
    }
    if (filterParams?.fromDate && filterParams?.toDate) {
      setRangeDate([
        new Date(Number(filterParams?.fromDate)),
        new Date(Number(filterParams?.toDate)),
      ]);
    } else if (filterParams?.toDate) {
      setRangeDate([null, new Date(Number(filterParams?.toDate))]);
    } else if (filterParams?.fromDate) {
      setRangeDate([new Date(Number(filterParams?.fromDate)), null]);
    }
    if (filterParams?.searchKey) {
      setSearchValue(filterParams.searchKey);
    }
  }, [filterParams, provinces]);

  const isDisable = useMemo(() => !!provinceId, [provinceId]);

  useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (provinceId) {
        const data = provinces?.filter(
          (item: any) => Number(provinceId) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else if (filterParams?.provinceId) {
        const newProvince = provinces?.find(
          province => Number(province.id) === Number(filterParams.provinceId),
        );
        setCurrentProvince(newProvince);
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      } else {
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      }
    }
  }, [provinces, provinceId]);

  const handleSearch = () => {
    const newFilterParams = {
      ...filterParams,
      page: 0,
      searchKey: searchValue,
      provinceId: currentProvince?.id === 0 ? undefined : currentProvince?.id,
    };
    onFilterToQueryString(newFilterParams);
  };

  const onSearch = (searchField: string): void => {
    setSearchValue(searchField);
  };

  const handleFilterStatus = (status: FilterStatusType | undefined) => {
    const newFilterParams = {
      ...filterParams,
      page: 0,
      status: status || undefined,
    };
    onFilterToQueryString(newFilterParams);
    setStatus(status);
  };

  const exportClaimList = () => {
    dispatch(
      actions.exportClaimList(
        {
          filter: {
            filter: searchValue || undefined,
            status,
            fromDate: dateRange.fromDate
              ? Number(dateRange.fromDate)
              : undefined,
            toDate: dateRange.toDate ? Number(dateRange.toDate) : undefined,
            provinceId:
              currentProvince?.id === 0 ? undefined : currentProvince?.id,
          },
        },
        err => {
          setOpenExportConfirm(false);
        },
      ),
    );
  };

  const onDateChange = (rangeDate: any) => {
    if (rangeDate?.length && rangeDate[1]) {
      const fromDate =
        rangeDate?.length && rangeDate[0]
          ? parseInt(moment(rangeDate[0]).format('x'))
          : ('' as string);
      const toDate =
        rangeDate?.length && rangeDate[1]
          ? parseInt(moment(rangeDate[1]).endOf('day').format('x'))
          : ('' as string);

      setDateRange({
        fromDate,
        toDate,
      });
      const newFilterParams = {
        ...filterParams,
        searchField: searchValue,
        page: 0,
        fromDate,
        toDate,
      };
      onFilterToQueryString(newFilterParams);
    }
  };

  const openExportConfirm = () => {
    setOpenExportConfirm(true);
  };

  const onChange = (province?: Province | null) => {
    if (province) {
      setCurrentProvince(province);
    }
  };

  const resetDateRangePicker = useCallback(() => {
    const newFilterParams = {
      ...filterParams,
      page: 0,
      fromDate: null,
      toDate: null,
    };
    onFilterToQueryString(newFilterParams);
    setDateRange({
      fromDate: '',
      toDate: '',
    });
    setRangeDate([null, null]);
  }, [filterParams]);

  return (
    <div>
      <Stack
        className="flex px-22"
        sx={{
          flexDirection: 'row-reverse',
          mb: 2,
          '& .date_range': {
            height: '41px',
          },
        }}
      >
        <DateRangeComponent
          handleDoneFilter={onDateChange}
          setRangeDefaultDate={setRangeDate}
          rangeDefaultDate={rangeDate}
          resetPicker={resetDateRangePicker}
        />
      </Stack>
      <RootContainer className="flex x-between y-center px-22">
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
              options={newProvinces || []}
              getOptionLabel={(item: any | null) =>
                item?.name || t(translations.common.all)
              }
              disabled={isDisable}
              value={currentProvince || t(translations.common.all)}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t(translations.common.province)}
                />
              )}
              onChange={(_, data: any | null) => {
                onChange(data);
              }}
            />
          </Box>
          <SearchInput
            width={316}
            keyword={searchValue}
            onSearch={onSearch}
            placeholder={t(translations.claimClubList.searchByName)}
          />
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
        <div className="flex" style={{ gap: 16 }}>
          <FilterButton
            onFilterStatus={handleFilterStatus}
            filterParams={filterParams}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#01AB55',
              color: 'white',
              width: '110px',
              height: '41px',
            }}
            onClick={openExportConfirm}
          >
            <Icon
              style={{ width: 20, height: 20, marginRight: 12 }}
              icon="ant-design:download-outlined"
            />
            <span>{t(translations.common.export)}</span>
          </Button>
        </div>
      </RootContainer>
      {isOpenExportConfirm && (
        <CustomDialog
          open
          title={t(translations.common.exportData)}
          content={
            <div>
              <Typography sx={{ marginBottom: 3, marginTop: 3 }}>
                {t(translations.common.areYouSureWantToExport)}
              </Typography>
              <Grid
                item
                xs={12}
                md={12}
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <LoadingButton
                  onClick={exportClaimList}
                  variant="contained"
                  loading={exporting}
                >
                  {t(translations.common.export)}
                </LoadingButton>
              </Grid>
            </div>
          }
          onCancel={() => setOpenExportConfirm(false)}
        />
      )}
    </div>
  );
});
export default ToolbarFilter;
