/**
 *
 * TableList
 *
 */
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Table from 'app/components/Table';
import { TableHeaderProps, Province, FilterListParams, Club } from 'types';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Card, Typography, Box } from '@mui/material';
import { debounce, get } from 'lodash';
import UserMoreMenu from 'app/components/MemberMoreMenu';
import {
  OrderType,
  MemberStatus,
  PackageMemberType,
  PackageNewMemberType,
  PackageName,
  CardPrintingStatus,
} from 'types/enums';
import { EllipsisText } from 'app/components/EllipsisText';
import { Status } from 'app/components/Status';
import moment from 'moment';
import { selectAuth } from 'app/pages/Auth/slice/selectors';
import { useFilterList } from 'app/hooks/useFilterList';
import {
  ChangeHistory,
  DownloadCard,
  EnrollmentLowerCase,
  EnrollmentType,
  MemberHistory,
  UpgradeKis,
} from 'types/Report';
import { DateRange } from '@mui/lab';
import { Loading } from 'app/components/Loading';

import TableToolbar from '../ToolbarFilter';
import { useMemberReportSlice } from '../../../slice';
import { selectMemberReport } from '../../../slice/selectors';
import { Header } from '../Header';

interface Props {
  headers: TableHeaderProps[];
}
interface ValueFilter {
  toDate?: any;
  fromDate?: any;
}

const initialFilter = {
  page: 0,
  size: 10,
  searchKey: '',
  provinceId: '',
  clubId: '',
  fromDate: '',
  toDate: '',
};
export const TableList = memo((props: Props) => {
  const { headers } = props;
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { provinces, clubsRequest } = useSelector(selectMemberReport);
  const [filterProvince, setFilterProvince] = useState<Province>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<
    number | undefined
  >();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [oldValueFilter, setOldValueFilter] = useState<ValueFilter>();
  const [filter, setFilter] = useState<FilterListParams>({
    page: 0,
    size: 10,
    searchKey: '',
    provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
    clubId: '',
    fromDate: '',
    toDate: '',
  });
  const { downloadCard, isLoadingDownloadCard } =
    useSelector(selectMemberReport);
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const [currentClub, setCurrentClub] = React.useState<Club | undefined>();
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);

  const checkIsFilter = (params: FilterListParams) => {
    if (
      params?.page !== 0 ||
      params?.size !== 10 ||
      params?.toDate ||
      params?.fromDate ||
      params?.searchKey ||
      params?.provinceId ||
      params?.clubId
    ) {
      return true;
    } else {
      return false;
    }
  };

  const { onFilterToQueryString, filterParams } = useFilterList({
    onFetchData: (params: FilterListParams) => {
      setOldValueFilter({
        ...oldValueFilter,
        fromDate: params?.fromDate || '',
        toDate: params?.toDate || '',
      });
      checkIsFilter(params) && fetchDataForPage(params);
    },
    defaultFilter: filter,
  });

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (userInformation?.provinceId) {
        const id: string = userInformation.provinceId;
        const data = provinces?.filter(
          (item: any) => parseInt(id) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else if (filter?.provinceId) {
        const newProvince = provinces?.find(
          province => province.id === Number(filter.provinceId),
        );
        setCurrentProvince(newProvince);
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      } else {
        const obj = { name: t(translations.common.all), id: 0 };
        setNewProvinces([obj, ...provinces]);
      }
    }
  }, [provinces, userInformation]);

  const fetchDataForPage = (params: FilterListParams) => {
    dispatch(
      actions.fetchDownloadCard({
        size: params.size,
        page: params.page,
        searchKey: params.searchKey,
        fromDate: params.fromDate,
        toDate: params.toDate,
        clubId: params.clubId,
        provinceId:
          params.provinceId ||
          (userInformation?.provinceId ? userInformation.provinceId : ''),
      }),
    );
    setFilter({
      ...params,
    });
  };

  const handleFilterData = (value: ValueFilter) => {
    const newFilter = {
      ...filter,
      fromDate: value?.fromDate,
      toDate: value?.toDate,
      page: 0,
    };

    onFilterToQueryString(newFilter);
    setFilter(newFilter);
  };

  const convertClub = (province: string, club: string) => {
    return (
      <div>
        <span style={{ fontWeight: 'bold' }}>{province}</span>
        {' - '}
        <span>{club}</span>
      </div>
    );
  };

  const renderItem = (item: DownloadCard, index?: number) => {
    return [
      <EllipsisText
        text={item.cardName ? String(item.cardName) : ''}
        line={2}
      ></EllipsisText>,
      item.provinceName ? item.provinceName : '-',
      item.clubName ? item.clubName : '-',
      item.processedBy ? item.processedBy : '-',
      <div>
        {item.requestedDate
          ? moment(item.requestedDate).format('DD/MM/YYYY HH:mm')
          : '-'}
        <Box
          sx={{
            color:
              item?.downloadCount === 0
                ? 'rgba(255, 107, 0, 1)'
                : 'rgba(0, 171, 85, 1)',
            textTransform: 'lowercase',
          }}
        >
          {item?.downloadCount}{' '}
          {item?.downloadCount && item?.downloadCount > 1
            ? t(translations.cardPrinting.downloads)
            : t(translations.cardPrinting.download)}
        </Box>
      </div>,
    ];
  };

  const onFilterByName = (value: string) => {
    setSearchValue(value);
  };

  const onRequestSort = (event: any, property: string) => {};

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
  };

  const handleOnchangeClub = (value?: Club) => {
    setCurrentClub(value);
  };

  const handleSearch = () => {
    const newFilter = {
      ...filter,
      page: 0,
      fromDate: filter.fromDate || 0,
      searchKey: searchValue,
      provinceId: currentProvince?.name === 'All' ? null : currentProvince?.id,
      clubId: currentClub?.clubName === 'All' ? null : currentClub?.id,
    };
    onFilterToQueryString(newFilter);
    setFilter(newFilter);
  };

  const handleOnPageChange = (pageNumber: number, size: number) => {
    const newFilter = {
      ...filter,
      page: pageNumber,
      size,
    };
    onFilterToQueryString(newFilter);
    setFilter(newFilter);
  };

  const onClearFilter = () => {
    setCurrentProvince(undefined);
    setCurrentClub(undefined);
    setSearchValue('');
    const newFilter = {
      ...filter,
      page: 0,
      size: 10,
      toDate: '',
      fromDate: 0,
      searchKey: '',
      provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
      clubId: '',
    };
    setRangeDate([null, null]);
    onFilterToQueryString(newFilter);
    setFilter({
      ...filter,
      searchKey: '',
      page: 0,
      size: 10,
      provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
      clubId: '',
      toDate: '',
      fromDate: '',
    });
  };

  return (
    <div>
      <Card sx={{ padding: '1rem', mt: 3 }}>
        <Header
          title={t(translations.report.historyPrintingCard)}
          onChecked={handleFilterData}
          setRangeDate={setRangeDate}
          rangeDate={rangeDate}
        />
        <TableToolbar
          handleSearch={handleSearch}
          keyword={filter?.searchKey}
          onSearch={onFilterByName}
          placeholder={t(translations.cardPrinting.searchPlaceholder)}
          provinces={newProvinces}
          currentProvince={currentProvince}
          onChangeProvince={onChangeProvince}
          onClearFilter={onClearFilter}
          provinceId={userInformation?.provinceId}
          user={userInformation}
          searchValue={searchValue}
          clubsRequest={clubsRequest?.data}
          handleOnchangeClub={handleOnchangeClub}
          currentClub={currentClub}
          filter={filter}
        />
        <Table
          headers={headers}
          items={downloadCard?.data}
          pageNumber={filter.page}
          totalElements={downloadCard?.count}
          renderItem={renderItem}
          order={'desc'}
          orderBy={''}
          onRequestSort={onRequestSort}
          onPageChange={handleOnPageChange}
        />
      </Card>
      <Loading isLoading={isLoadingDownloadCard} />
    </div>
  );
});
