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
  EnrollmentLowerCase,
  EnrollmentType,
  MemberHistory,
} from 'types/Report';
import { DateRange } from '@mui/lab';
import { Loading } from 'app/components/Loading';
import { currencyFormat } from 'utils/helpers/currency';

import TableToolbar from '../ToolbarFilter';
import { useMemberReportSlice } from '../../../slice';
import { selectMemberReport } from '../../../slice/selectors';
import { Header } from '../Header';

interface Props {
  headers: TableHeaderProps[];
}
interface ValueFilter {
  packageType: string[];
  enrollmentType: string[];
  endDate?: any;
  startDate?: any;
}

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
    enrollmentType: [],
    packageType: [],
  });
  const { membershipHistory, isLoadingKTA } = useSelector(selectMemberReport);
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);

  const checkIsFilter = (params: FilterListParams) => {
    if (
      (params?.packageType && params?.packageType.length > 0) ||
      (params?.enrollmentType && params?.enrollmentType.length > 0) ||
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
        packageType: params?.packageType || [''],
        enrollmentType: params?.enrollmentType || [''],
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

  const defaultPackages = [
    {
      name: t(translations.common.ktaMobility),
      value: PackageNewMemberType.KTA_MOBILITY,
    },
    {
      name: t(translations.common.ktaPro),
      value: PackageNewMemberType.KTA_PRO,
    },
  ];
  const defaultEnrollmentType = [
    {
      name: t(translations.common.newEnroll),
      value: EnrollmentType.NEW_ENROLL,
    },
    { name: t(translations.common.renew), value: EnrollmentType.RENEW },
    {
      name: t(translations.common.upgradePro),
      value: EnrollmentType.UPGRADE_PRO,
    },
  ];

  const fetchDataForPage = (params: FilterListParams) => {
    dispatch(
      actions.fetchMembershipHistory({
        size: params.size,
        page: params.page,
        searchKey: params.searchKey,
        startDate: params.startDate,
        endDate: params.endDate,
        enrollmentType: getStatus(params.enrollmentType || []),
        provinceId:
          params.provinceId ||
          (userInformation?.provinceId ? userInformation.provinceId : ''),
        packageType: getPackage(params.packageType || []),
      }),
    );
    setFilter({
      ...params,
      packageType: !params.packageType ? [] : params.packageType,
    });
  };

  const getPackage = (packageCode: string[]) => {
    const newPackage: string[] = [];
    packageCode.map(item => {
      if (item === 'All' || item === '') return [];
      else {
        newPackage.push(item);
      }
    });
    return newPackage;
  };

  const getStatus = (status: string[]) => {
    const newStatus: string[] = [];
    status.map(item => {
      if (item === 'All' || item === '') return [];
      else {
        newStatus.push(item);
      }
    });
    return newStatus;
  };

  const fieldList = [
    {
      name: 'packageType',
      data: defaultPackages,
      status: filter?.packageType,
      title: t(translations.common.packageType),
    },
    {
      name: 'enrollmentType',
      data: defaultEnrollmentType,
      status: filter?.enrollmentType,
      title: t(translations.common.enrollmentType),
    },
  ];

  const handleFilterData = (value: ValueFilter) => {
    const newFilter = {
      ...filter,
      packageType: value?.packageType,
      enrollmentType: value?.enrollmentType,
      startDate: value?.startDate,
      endDate: value?.endDate,
      page: 0,
    };

    onFilterToQueryString(newFilter);
    setFilter(newFilter);
  };

  const renderItem = (item: MemberHistory, index?: number) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <div>
          <Avatar src={item?.avatar} sx={{ width: 35, height: 35 }} />{' '}
        </div>
        <EllipsisText
          text={item?.fullName ? String(item?.fullName) : ''}
          line={2}
          width={300}
        ></EllipsisText>
      </Stack>,
      item.ktaNumber,
      item.phone,
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{item?.packageName}</div>
        <Typography sx={{ color: '#00AB55' }}>
          {get(EnrollmentLowerCase, `${item?.enrollmentType}`)}
        </Typography>
      </div>,
      item.provinceName,
      `Rp ${currencyFormat(item?.totalPrice)}`,
      <EllipsisText text={item.clubJoined || '-'} width={500} />,
      <div>
        {item.expirationDate
          ? moment(item.expirationDate).format('DD/MM/YYYY')
          : '-'}
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
      packageType: [],
      enrollmentType: [],
    };
    setRangeDate([null, null]);
    onFilterToQueryString(newFilter);
    setFilter({
      ...filter,
      searchKey: '',
      packageType: [],
      enrollmentType: [],
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
          title={t(translations.tableMembership.membershipHistory)}
          onChecked={handleFilterData}
          filterList={fieldList}
          oldValueFilter={oldValueFilter}
          setRangeDate={setRangeDate}
          rangeDate={rangeDate}
        />
        <TableToolbar
          handleSearch={handleSearch}
          keyword={filter?.searchKey}
          onSearch={onFilterByName}
          placeholder={t(translations.tableMembership.searchPlaceholder)}
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
          stickyHeader
          maxHeight={650}
          headers={headers}
          items={membershipHistory?.data}
          pageNumber={filter.page}
          totalElements={membershipHistory?.count}
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
      <Loading isLoading={isLoadingKTA} />
    </div>
  );
});
