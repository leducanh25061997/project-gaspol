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
  TktClub,
  UpgradeKis,
} from 'types/Report';
import { DateRange } from '@mui/lab';
import { Loading } from 'app/components/Loading';
import { Star } from 'app/components/Star';

import TableToolbar from '../ToolbarFilter';
import { Header } from '../Header';
import { useClubReportSlice } from '../../slice';
import { selectClubReport } from '../../slice/selectors';

interface Props {
  headers: TableHeaderProps[];
}
interface ValueFilter {
  endDate?: any;
  startDate?: any;
}

const checkIsFilter = (params: FilterListParams) => {
  if (
    params?.page !== 0 ||
    params?.size !== 10 ||
    params?.endDate ||
    params?.startDate ||
    params?.searchKey ||
    params?.provinceId ||
    params?.enrollmentType ||
    params?.memberNo ||
    params?.star
  ) {
    return true;
  } else {
    return false;
  }
};

export const TableList = memo((props: Props) => {
  const { headers } = props;
  const dispatch = useDispatch();
  const { actions } = useClubReportSlice();
  const { provinces, TKTClub, isLoadingTKTClub } =
    useSelector(selectClubReport);
  const [searchValue, setSearchValue] = useState<string>('');
  const [newProvinces, setNewProvinces] = useState<any[]>([]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [oldValueFilter, setOldValueFilter] = useState<ValueFilter>();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const initialFilter = {
    page: 0,
    size: 10,
    searchKey: '',
    provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
    startDate: '',
    endDate: '',
    enrollmentType: [],
    memberNo: [],
    star: [],
  };
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);

  const { onFilterToQueryString, filterParams, setFilterParams } =
    useFilterList({
      onFetchData: (params: FilterListParams) => {
        setOldValueFilter({
          ...oldValueFilter,
          ...params,
        });
        fetchDataForPage(params);
      },
      defaultFilter: initialFilter,
    });

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      if (userInformation?.provinceId) {
        const id: string = userInformation.provinceId;
        const data = provinces?.filter(
          (item: any) => parseInt(id) === item?.id,
        );
        setCurrentProvince(data && data[0]);
      } else if (filterParams?.provinceId) {
        const newProvince = provinces?.find(
          province => province.id === Number(filterParams.provinceId),
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
    const requestParams: any = {
      size: params.size,
      page: params.page,
      searchKey: params.searchKey,
      startDate: params.startDate,
      endDate: params.endDate,
      clubType: 'IMI_CLUB',
      provinceId:
        params.provinceId ||
        (userInformation?.provinceId ? userInformation.provinceId : ''),
      enrollmentType: params.enrollmentType,
      star: params.star,
    };

    if (params.memberNo && params.memberNo?.length < 2) {
      requestParams['memberNo'] = params.memberNo;
    }
    dispatch(actions.fetchTKTClub(requestParams));

    setFilterParams({
      ...params,
    });
  };

  const handleFilterData = (value: ValueFilter) => {
    const newFilter = {
      ...filterParams,
      ...value,
      page: 0,
    };

    onFilterToQueryString(newFilter);
    setFilterParams(newFilter);
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

  const renderItem = (item: TktClub, index?: number) => {
    return [
      <EllipsisText text={item?.clubName} line={2} width={300} />,
      item?.clubCode ? item.clubCode : '-',
      <Star numberStar={item?.star} />,
      item?.enrollmentType ? item.enrollmentType.split('_').join(' ') : '-',
      item.provinceName ? item.provinceName : '-',
      item?.memberNo ? item?.memberNo : '-',
      <div>
        {item.expiredDate ? moment(item.expiredDate).format('DD/MM/YYYY') : '-'}
      </div>,
      item.transactionId || '-',
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
      ...filterParams,
      page: 0,
      startDate: filterParams.startDate || 0,
      searchKey: searchValue,
      provinceId: currentProvince?.name === 'All' ? null : currentProvince?.id,
    };
    onFilterToQueryString(newFilter);
    setFilterParams(newFilter);
  };

  const handleOnPageChange = (pageNumber: number, size: number) => {
    const newFilter = {
      ...filterParams,
      page: pageNumber,
      size,
    };
    onFilterToQueryString(newFilter);
    setFilterParams(newFilter);
  };

  const onClearFilter = () => {
    setCurrentProvince(undefined);
    setSearchValue('');
    const newFilter = {
      ...filterParams,
      page: 0,
      size: 10,
      endDate: '',
      startDate: 0,
      searchKey: '',
      provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
      memberNo: [],
      enrollmentType: [],
      star: [],
    };
    setRangeDate([null, null]);
    onFilterToQueryString(newFilter);
    setFilterParams({
      ...filterParams,
      searchKey: '',
      page: 0,
      size: 10,
      provinceId: userInformation?.provinceId ? userInformation.provinceId : '',
      endDate: '',
      startDate: '',
      memberNo: [],
      enrollmentType: [],
      star: [],
    });
  };
  return (
    <div>
      <Card sx={{ padding: '1rem', mt: 3 }}>
        <Header
          title={t(translations.report.tktClubList)}
          onChecked={handleFilterData}
          setRangeDate={setRangeDate}
          rangeDate={rangeDate}
          setFilter={handleFilterData}
        />
        <TableToolbar
          handleSearch={handleSearch}
          keyword={filterParams?.searchKey}
          onSearch={onFilterByName}
          placeholder={t(translations.report.clubPlaceholder)}
          provinces={newProvinces}
          currentProvince={currentProvince}
          onChangeProvince={onChangeProvince}
          onClearFilter={onClearFilter}
          provinceId={userInformation?.provinceId}
          user={userInformation}
          searchValue={searchValue}
          filter={filterParams}
        />
        <Table
          stickyHeader
          maxHeight={650}
          headers={headers}
          items={TKTClub?.data}
          pageNumber={filterParams.page}
          totalElements={TKTClub?.count}
          renderItem={renderItem}
          order={'desc'}
          orderBy={''}
          onRequestSort={onRequestSort}
          onPageChange={handleOnPageChange}
        />
      </Card>
      <Loading isLoading={!isLoadingTKTClub} />
    </div>
  );
});
