import React, { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Table from 'app/components/Table';
import { MembershipRequest, Province, FilterMemberParams } from 'types';
import { Card, Stack, Avatar } from '@mui/material';
import { OrderType, MembershipType } from 'types/enums';
import path from 'app/routes/path';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { useFilter } from 'app/hooks/useFilter';

import { Status } from 'app/components/Status';

import { EllipsisText } from 'app/components/EllipsisText';

import { TableToolbar } from '../ToolbarFilter';

import { useMemberManagementSlice } from '../../slice';
import { selectBusinessPartnerManagement } from '../../slice/selectors';
interface Props {
  items?: MembershipRequest[];
  totalElements?: number;
}

const initialFilter = {
  limit: 10,
  offset: 0,
  membershipType: MembershipType?.TAA_BUSINESS_PARTNER,
  partnerFilter: {
    orderBy: '',
    orderType: OrderType.DESC,
    name: '',
    status: [],
  },
};

export const TableList = memo((props: Props) => {
  const { items, totalElements } = props;
  const navigate = useNavigate();
  const [filter, setFilter] = useState<any>(initialFilter);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { provinces } = useSelector(selectBusinessPartnerManagement);
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const { actions } = useMemberManagementSlice();
  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();
  const headers = [
    {
      id: 'partnerName',
      label: t(translations.tableMembership.name),
      hasSort: true,
    },
    {
      id: 'picPhone',
      label: t(translations.common.picPhoneNumber),
    },
    // {
    //   id: 'merchantType',
    //   label: t(translations.common.merchantType),
    // },
    {
      id: 'provinceName',
      label: t(translations.common.province),
    },
    {
      id: 'status',
      label: t(translations.tableMembership.status),
      hasSort: true,
    },
    {
      id: 'registerTime',
      label: t(translations.tableMembership.registerTime),
    },
    {
      id: 'moremenu',
      label: '',
    },
  ];

  useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, []);

  useEffect(() => {
    if (provinces && provinces.length > 0) {
      const obj = { name: t(translations.common.all), id: 0 };
      setNewProvinces([obj, ...provinces]);
    }
  }, [provinces]);

  const renderItem = (item: MembershipRequest, index?: number) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <div>
          <Avatar
            src={item.avatarPictureLink || item.profilePictureLink}
            sx={{ width: 35, height: 35 }}
          />{' '}
        </div>
        <EllipsisText text={String(item?.partnerName)}></EllipsisText>
      </Stack>,
      <EllipsisText text={item?.picPhone}></EllipsisText>,
      <EllipsisText text={item?.provinceName}></EllipsisText>,
      <Status status={item?.status} />,
      <EllipsisText text={'31-12-2022 11:59 AM'}></EllipsisText>,
    ];
  };

  const fetchDataForPage = (params: FilterMemberParams) => {
    dispatch(
      actions.fetchMembersData({
        limit: params.limit,
        offset: params?.offset,
        membershipType: MembershipType.TAA_BUSINESS_PARTNER,
        partnerFilter: {
          name: params?.partnerFilter?.name,
          orderBy: params?.partnerFilter?.orderBy,
          orderType: params?.partnerFilter?.orderType,
          provinceId: params?.partnerFilter?.provinceId,
          status: params?.partnerFilter?.status,
        },
      }),
    );
  };

  const onRequestSort = (event: any, property: string) => {
    const onOrder =
      property && filter?.partnerFilter?.orderType === OrderType.ASC
        ? OrderType.DESC
        : OrderType.ASC;

    const newFilterParams = {
      ...filter,
      partnerFilter: {
        ...filter?.partnerFilter,
        orderBy: property,
        orderType: onOrder,
      },
    };
    setFilter(newFilterParams);
    handleFetchDataForPage(newFilterParams);
  };

  const handleOnPageChange = (pageNumber: number, limit: number) => {
    const newFilterParams = {
      ...filter,
      offset: pageNumber,
      limit,
    };
    setFilter(newFilterParams);
    handleFetchDataForPage(newFilterParams);
  };

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
    const newFilter = {
      ...filter,
      partnerFilter: {
        ...filter?.partnerFilter,
        provinceId: province?.name === 'All' ? '' : province?.id,
      },
    };
    setFilter(newFilter);
    handleFetchDataForPage(newFilter);
  };

  const handleFetchDataForPage = (params: FilterMemberParams) => {
    fetchDataForPage({
      limit: params.limit,
      offset: params?.offset,
      membershipType: MembershipType.TAA_BUSINESS_PARTNER,
      partnerFilter: {
        name: params?.partnerFilter?.name,
        orderBy: params?.partnerFilter?.orderBy,
        orderType: params?.partnerFilter?.orderType,
        provinceId: params?.partnerFilter?.provinceId,
        status: params?.partnerFilter?.status,
      },
    });
    onFilterToQueryString(params);
  };

  const { onFilterToQueryString } = useFilter({
    onFetchData: (params: FilterMemberParams) => {
      handleFetchDataForPage(params);
    },
    defaultFilter: initialFilter,
  });

  const onChangeFilter = (filterParams: FilterMemberParams) => {
    const newFilterParams = {
      ...filterParams,
      partnerFilter: {
        ...filterParams.partnerFilter,
      },
    };
    setFilter(newFilterParams);
    handleFetchDataForPage(newFilterParams);
  };

  const onSearchBusinessPartner = debounce((value: string) => {
    const newFilterParams = {
      ...filter,
      partnerFilter: {
        ...filter?.promoterFilter,
        name: value,
      },
    };
    setFilter(newFilterParams);
    handleFetchDataForPage(newFilterParams);
  }, 500);

  return (
    <Card sx={{ padding: '1rem' }}>
      <TableToolbar
        onChangeFilter={onChangeFilter}
        filter={filter}
        onSearchBusinessPartner={onSearchBusinessPartner}
        searchValue={filter.promoterFilter?.name || ''}
        currentProvince={currentProvince}
        provinces={newProvinces}
        onChangeProvince={onChangeProvince}
      />
      <Table
        headers={headers}
        items={items}
        pageNumber={filter.offset}
        totalElements={totalElements}
        renderItem={renderItem}
        onSelectRow={item =>
          navigate(path.associations + `/business-partner` + `/${item.id}`, {
            state: { id: item.id },
          })
        }
        order={filter.partnerFilter?.orderType || 'desc'}
        orderBy={`${filter?.partnerFilter?.orderBy}`}
        onRequestSort={onRequestSort}
        onPageChange={handleOnPageChange}
      />
    </Card>
  );
});
