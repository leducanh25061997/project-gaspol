/**
 *
 * TableList
 *
 */
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Table from 'app/components/Table';
import {
  MembershipRequest,
  TableHeaderProps,
  Province,
  FilterIndividualMemberValue,
  FilterListParams,
} from 'types';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Stack,
  Card,
  Button,
  DialogActions,
  Grid,
  Typography,
} from '@mui/material';
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
import { ApprovalDialog } from 'app/components/ApprovalDialog';
import { CustomDialog } from 'app/components/CustomDialog';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { useFilterList } from 'app/hooks/useFilterList';

import { useMemberManagementSlice } from '../../slice';
import TableToolbar from '../ToolbarFilter';
import { selectMemberManagement } from '../../slice/selectors';

interface Props {
  headers: TableHeaderProps[];
  items?: MembershipRequest[];
  totalElements?: number;
}
interface ValueFilter {
  status: string[];
  packageCode: string[];
  packageStatus: string[];
}
interface ParamsPageProps {
  page?: number;
  size?: number;
  searchKey?: string;
  orderBy?: OrderType;
  orderType?: string;
  packageCode?: string[];
  status?: string[];
  memberStatus?: string[];
  packageStatus?: string[];
  province?: any;
}

const initialFilter = {
  memberStatus: [],
  page: 0,
  size: 10,
  searchKey: '',
  province: '',
  packageCode: [],
  packageStatus: [],
};
export const TableList = memo((props: Props) => {
  const { headers, items, totalElements } = props;
  const dispatch = useDispatch();
  const { actions } = useMemberManagementSlice();
  const { provinces } = useSelector(selectMemberManagement);
  const [searchValue, setSearchValue] = useState<string>('');
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<
    number | undefined
  >();
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [oldValueFilter, setOldValueFilter] = useState<ValueFilter>();
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();

  const checkIsFilter = (params: FilterListParams) => {
    if (
      (params?.memberStatus && params?.memberStatus.length > 0) ||
      (params?.packageCode && params?.packageCode.length > 0) ||
      (params?.packageStatus && params?.packageStatus.length > 0) ||
      params?.page ||
      params?.size ||
      params?.searchKey ||
      params?.province
    ) {
      return true;
    } else {
      return false;
    }
  };

  const { onFilterToQueryString, filterParams, setFilterParams } =
    useFilterList({
      onFetchData: (params: FilterListParams) => {
        setOldValueFilter({
          ...oldValueFilter,
          status: params?.memberStatus || [''],
          packageCode: params?.packageCode || [''],
          packageStatus: params?.packageStatus || [''],
        });
        checkIsFilter(params) && fetchDataForPage(params);
        // const newProvince = provinces?.find(
        //   province => province.id === Number(params.province),
        // );
        // setCurrentProvince(newProvince);
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
      } else if (filterParams?.province) {
        const newProvince = provinces?.find(
          province => province.id === Number(filterParams.province),
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
    {
      name: t(translations.common.basic),
      value: PackageNewMemberType.BASIC_ACCOUNT,
    },
    // { name: t(translations.common.all), value: 'All' },
  ];
  const defaultStatuses = [
    { name: t(translations.common.actived), value: MemberStatus.ACTIVE },
    { name: t(translations.common.banned), value: MemberStatus.BANNED },
    // { name: t(translations.common.all), value: '' },
  ];

  const packageStatus = [
    { name: t(translations.common.active), value: MemberStatus.ACTIVE },
    { name: t(translations.common.expired), value: MemberStatus.EXPIRED },
    // { name: t(translations.common.all), value: '' },
  ];

  const fetchDataForPage = (params: FilterListParams) => {
    let ps: string | string[] | undefined;
    if (params.packageStatus && params.packageStatus?.length === 1) {
      ps = params.packageStatus[0];
    }

    const newParams = {
      size: params.size,
      page: params.page,
      searchKey: params.searchKey,
      memberStatus: getStatus(params.memberStatus || []),
      packageStatus: ps ? ps : null,
      province:
        params.province ||
        (userInformation?.provinceId ? userInformation.provinceId : ''),
      packageCode: getPackage(params.packageCode || []),
      order: [
        {
          fieldName: 'created_date',
          orderBy: 'DESC',
          lowerCase: false,
        },
      ],
    };

    dispatch(actions.fetchMembersData(newParams));
    setFilterParams({
      ...params,
      packageStatus: !params.packageStatus ? [] : params.packageStatus,
    });
  };

  React.useEffect(() => {
    if (userInformation?.provinceId) {
      onFilterToQueryString({
        ...filterParams,
        province: userInformation?.provinceId,
      });
    }
  }, [filterParams, userInformation?.provinceId]);

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
      name: 'package',
      data: defaultPackages,
      packageCode: filterParams?.packageCode,
      title: t(translations.common.package),
    },
    {
      name: 'packageStatus',
      data: packageStatus,
      status: filterParams?.packageStatus,
      title: t(translations.common.packageStatus),
    },
    {
      name: 'status',
      data: defaultStatuses,
      status: filterParams?.memberStatus,
      title: t(translations.common.memberStatus),
    },
  ];

  const handleFilterData = (value: ValueFilter) => {
    const newFilter = {
      ...filterParams,
      page: 0,
      packageCode: value?.packageCode,
      memberStatus: value?.status,
      packageStatus: value?.packageStatus,
    };

    // handleFetchDataForPage(newFilter);
    onFilterToQueryString(newFilter);
    setFilterParams(newFilter);
  };

  const renderItem = (item: MembershipRequest, index?: number) => {
    const items = [
      {
        name: t(translations.memberManagement.requestCardPrint),
        icon: 'fluent:print-48-filled',
        link: '',
        itemComponent: Button,
        onClick: () => {
          setOpenConfirmDialog(true);
          setSelectedMemberId(item?.id as number);
        },
      },
      {
        name: t(translations.common.editMemberInfo),
        icon: 'eva:edit-fill',
        link: path.memberships + `/edit/${item.id}`,
        itemComponent: RouterLink,
      },
    ];

    if (
      (userInformation &&
        !userInformation.roles.includes('member_details_card_request') &&
        !userInformation.roles.includes(
          'member_details_card_request_province',
        )) ||
      (userInformation &&
        (userInformation.roles.includes('member_details_card_request') ||
          userInformation.roles.includes(
            'member_details_card_request_province',
          )) &&
        item.packageCode !== 'KTA_PRO')
    ) {
      items.splice(0, 1);
    }

    if (
      userInformation &&
      !userInformation.roles.includes('member_details_update') &&
      !userInformation.roles.includes('member_details_update_basic_profile')
    ) {
      const index = items.findIndex(
        item => item.name === t(translations.common.editMemberInfo),
      );
      items.splice(index, 1);
    }
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
      item.ktaNumber,
      <EllipsisText text={item?.phone}></EllipsisText>,
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{item?.packageCode ? get(PackageName, item.packageCode) : ''}</div>
        <Status status={item?.packageStatus} transparentBg />
      </div>,
      item.provinceName,
      <Status status={item?.memberStatus} />,
      item.registerTime
        ? moment(item.registerTime).format('DD/MM/YYYY HH:mm')
        : '',
      userInformation &&
      (userInformation.roles.includes('member_details_update') ||
        userInformation.roles.includes(
          'member_details_update_basic_profile',
        )) &&
      (userInformation.roles.includes('member_details_card_request') ||
        userInformation.roles.includes(
          'member_details_card_request_province',
        )) ? (
        <UserMoreMenu items={items} />
      ) : (
        ''
      ),
    ];
  };

  const onFilterByName = (value: string) => {
    setSearchValue(value);
  };

  const handleFetchDataForPage = (params: FilterListParams) => {
    fetchDataForPage(params);
  };

  const onRequestSort = (event: any, property: string) => {};

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
  };

  const handleSearch = () => {
    const newFilter = {
      ...filterParams,
      page: 0,
      searchKey: searchValue,
      province: currentProvince?.name === 'All' ? null : currentProvince?.id,
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
    // handleFetchDataForPage(newFilter);
    onFilterToQueryString(newFilter);
    setFilterParams(newFilter);
  };
  // console.log(filter.filterName);
  const onClearFilter = () => {
    setCurrentProvince(undefined);
    // handleFetchDataForPage({
    //   page: 0,
    //   size: 10,
    // });
    onFilterToQueryString({
      page: 0,
      size: 10,
    });
    setFilterParams({
      ...filterParams,
      searchKey: '',
      memberStatus: [],
      packageStatus: [],
      page: 0,
      size: 10,
      province: '',
      packageCode: [],
    });
  };
  const renderContentDialog = (
    <div>
      <Grid>
        <Typography>{t(translations.common.cannotViewMemberDetail)}</Typography>
      </Grid>
      <Grid sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ marginRight: '3px' }}>
          {t(translations.common.becauseThisIsNot)}{' '}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>
          {t(translations.common.membershipMember)}
        </Typography>
      </Grid>
    </div>
  );

  const onApprovedSendRequestDownload = () => {
    setLoading(true);
    dispatch(
      actions.sendRequestDownloadCard(
        {
          membershipId: selectedMemberId,
          status: CardPrintingStatus.REQUESTED,
        },
        (err?: any) => {
          if (!err) {
            // navigate(path.cardPrinting);
            setOpenConfirmDialog(false);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        },
      ),
    );
    setOpenConfirmDialog(false);
  };

  return (
    <Card sx={{ padding: '1rem' }}>
      <TableToolbar
        // reset={reset}
        handleSearch={handleSearch}
        keyword={filterParams?.searchKey}
        onSearch={onFilterByName}
        placeholder={t(translations.tableMembership.searchPlaceholder)}
        onChecked={handleFilterData}
        provinces={newProvinces}
        currentProvince={currentProvince}
        filterList={fieldList}
        onChangeProvince={onChangeProvince}
        onClearFilter={onClearFilter}
        provinceId={userInformation?.provinceId}
        user={userInformation}
        oldValueFilter={oldValueFilter}
      />
      <Table
        headers={headers}
        items={items}
        pageNumber={filterParams.page}
        totalElements={totalElements}
        renderItem={renderItem}
        onSelectRow={item => {
          // if (item.packageCode === 'BASIC_ACCOUNT') {
          //   setOpenWarningDialog(true);
          // } else {
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
        order={'desc'}
        orderBy={''}
        onRequestSort={onRequestSort}
        onPageChange={handleOnPageChange}
      />
      <ApprovalDialog
        title={t(translations.common.confirmation)}
        description={t(translations.common.areYouWantRequestPrintCard)}
        open={openConfirmDialog}
        isConfirmDialog
        onCancel={() => setOpenConfirmDialog(false)}
        onApprove={onApprovedSendRequestDownload}
        loading={loading}
      />
    </Card>
  );
});
