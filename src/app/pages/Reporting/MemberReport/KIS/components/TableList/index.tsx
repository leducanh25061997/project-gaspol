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
import { TableHeaderProps, Province, FilterListParams } from 'types';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Card, Typography } from '@mui/material';
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
  endDate?: any;
  startDate?: any;
}

const initialFilter = {
  page: 0,
  size: 10,
  searchKey: '',
  provinceId: '',
  startDate: '',
  endDate: '',
};
export const TableList = memo((props: Props) => {
  const { headers } = props;
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { provinces } = useSelector(selectMemberReport);
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
    startDate: '',
    endDate: '',
  });
  const { upgradeKis, isLoadingUpgradeKis } = useSelector(selectMemberReport);
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);

  const checkIsFilter = (params: FilterListParams) => {
    if (
      params?.page !== 0 ||
      params?.size !== 10 ||
      params?.endDate ||
      params?.startDate ||
      params?.searchKey ||
      params?.provinceId
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
        startDate: params?.startDate || '',
        endDate: params?.endDate || '',
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
      actions.fetchUpgradeKis({
        size: params.size,
        page: params.page,
        searchKey: params.searchKey,
        startDate: params.startDate,
        endDate: params.endDate,
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
      startDate: value?.startDate,
      endDate: value?.endDate,
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

  const renderItem = (item: UpgradeKis, index?: number) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <div>
          <Avatar src={item?.avatar} sx={{ width: 35, height: 35 }} />{' '}
        </div>
        <EllipsisText
          text={item?.fullName ? String(item?.fullName) : ''}
          line={2}
        ></EllipsisText>
      </Stack>,
      item.ktaNumber ? item.ktaNumber : '-',
      item.clubName ? item.clubName : '-',
      item.provinceName ? item.provinceName : '-',
      item.transactionTime
        ? moment(item.transactionTime).format('DD/MM/YYYY HH:mm')
        : '-',
    ];
  };

  const onFilterByName = (value: string) => {
    setSearchValue(value);
  };

  const onRequestSort = (event: any, property: string) => {};

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
  };

  const handleSearch = () => {
    const newFilter = {
      ...filter,
      page: 0,
      startDate: filter.startDate || 0,
      searchKey: searchValue,
      provinceId: currentProvince?.name === 'All' ? null : currentProvince?.id,
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
    setSearchValue('');
    const newFilter = {
      ...filter,
      page: 0,
      size: 10,
      endDate: '',
      startDate: 0,
      searchKey: '',
      provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
    };
    setRangeDate([null, null]);
    onFilterToQueryString(newFilter);
    setFilter({
      ...filter,
      searchKey: '',
      page: 0,
      size: 10,
      provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
      endDate: '',
      startDate: '',
    });
  };

  return (
    <div>
      <Card sx={{ padding: '1rem', mt: 3 }}>
        <Header
          title={t(translations.report.historyUpgradedKis)}
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
          filter={filter}
        />
        <Table
          headers={headers}
          items={upgradeKis?.data}
          pageNumber={filter.page}
          totalElements={upgradeKis?.count}
          renderItem={renderItem}
          order={'desc'}
          orderBy={''}
          onRequestSort={onRequestSort}
          onPageChange={handleOnPageChange}
          onSelectRow={item => {
            if (
              userInformation &&
              (userInformation.roles.includes('member_details_read') ||
                userInformation.roles.includes('member_details_read_province'))
            ) {
              navigate(path.memberships + `/${item.id}`, {
                state: { id: item.id },
              });
            }
          }}
        />
      </Card>
      <Loading isLoading={isLoadingUpgradeKis} />
    </div>
  );
});
