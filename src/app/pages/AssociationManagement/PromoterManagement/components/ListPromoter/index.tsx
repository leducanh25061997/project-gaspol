/**
 *
 * ListPromoter
 *
 */
import { Grid, Typography } from '@mui/material';
import Table from 'app/components/Table';
import React, { memo, useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import {
  FilterMemberParams,
  FilterParams,
  MembershipRequest,
  Province,
} from 'types';
import { Link as RouterLink } from 'react-router-dom';

import { Status } from 'app/components/Status';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import path from 'app/routes/path';
import moment from 'moment';
import {
  OrderType,
  MemberStatus,
  Stars,
  Upload,
  MembershipType,
} from 'types/enums';

import querystring from 'query-string';
import { debounce } from 'lodash';

import { useFilter } from 'app/hooks/useFilter';

import { EllipsisText } from 'app/components/EllipsisText';

import { selectPromoterManagement } from '../../slice/selectors';
import { usePromoterManagementSlice } from '../../slice';
import { Toolbar } from '../Toolbar';

interface Props {
  items?: MembershipRequest[];
  totalElements?: number;
}

const initialFilter = {
  limit: 10,
  offset: 0,
  membershipType: MembershipType.TAA_PROMOTOR,
  promoterFilter: {
    orderBy: '',
    orderType: OrderType.DESC,
    name: '',
    status: [],
  },
};

export const ListPromoter = memo((props: Props) => {
  const { items, totalElements } = props;
  const { t } = useTranslation();
  const { actions } = usePromoterManagementSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newProvinces, setNewProvinces] = useState<any[]>([]);
  const { provinces } = useSelector(selectPromoterManagement);
  const [filter, setFilter] = useState<any>(initialFilter);
  const fetchDataForPage = (params: FilterMemberParams) => {
    dispatch(
      actions.fetchPromotersData({
        limit: params.limit,
        offset: params.offset,
        membershipType: MembershipType.TAA_PROMOTOR,
        promoterFilter: {
          orderBy: params?.promoterFilter?.orderBy,
          orderType: params?.promoterFilter?.orderType,
          name: params?.promoterFilter?.name,
          status: params.promoterFilter?.status,
          provinceId: params.promoterFilter?.provinceId,
        },
      }),
    );
  };

  const { onFilterToQueryString } = useFilter({
    onFetchData: (params: FilterMemberParams) => {
      handleFetchDataForPage(params);
    },
    defaultFilter: initialFilter,
  });

  const [currentProvince, setCurrentProvince] = React.useState<
    Province | undefined
  >();

  const onChangeProvince = (province?: Province) => {
    setCurrentProvince(province);
    const newFilter = {
      ...filter,
      promoterFilter: {
        ...filter?.promoterFilter,
        provinceId: province?.name === 'All' ? '' : province?.id,
      },
    };
    setFilter(newFilter);
    handleFetchDataForPage(newFilter);
  };

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, []);

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      const obj = { name: t(translations.common.all), id: 0 };
      setNewProvinces([obj, ...provinces]);
    }
  }, [provinces]);

  const handleFetchDataForPage = (params: FilterMemberParams) => {
    fetchDataForPage({
      limit: params.limit,
      offset: params?.offset,
      membershipType: MembershipType.TAA_PROMOTOR,
      promoterFilter: {
        orderBy: params?.promoterFilter?.orderBy,
        orderType: params?.promoterFilter?.orderType,
        name: params?.promoterFilter?.name,
        status: params.promoterFilter?.status,
        provinceId: params.promoterFilter?.provinceId,
      },
    });
    onFilterToQueryString(params);
  };

  const onRequestSort = (event: any, property: string) => {
    const onOrder =
      property && filter?.promoterFilter?.orderType === OrderType.ASC
        ? OrderType.DESC
        : OrderType.ASC;

    const newFilterParams = {
      ...filter,
      promoterFilter: {
        ...filter?.promoterFilter,
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

  const onSearchPromoter = debounce((value: string) => {
    const newFilterParams = {
      ...filter,
      promoterFilter: {
        ...filter?.promoterFilter,
        name: value,
      },
    };
    setFilter(newFilterParams);
    handleFetchDataForPage(newFilterParams);
  }, 500);

  const onChangeFilter = (filterParams: FilterMemberParams) => {
    const newFilterParams = {
      ...filterParams,
      promoterFilter: {
        ...filterParams.promoterFilter,
      },
    };
    setFilter(newFilterParams);
    handleFetchDataForPage(newFilterParams);
  };

  const headers = [
    {
      id: 'promotorName',
      label: t(translations.tableRequestPromoter.name),
      hasSort: true,
    },
    {
      id: 'promoterPIC',
      label: t(translations.tableRequestPromoter.promoterPIC),
      width: '20%',
    },
    {
      id: 'ktaNumber',
      label: t(translations.tableRequestPromoter.ktaNumber),
      width: '15%',
    },
    {
      id: 'picPhoneNumber',
      label: t(translations.tableRequestPromoter.picPhoneNumber),
      width: '20%',
    },
    {
      id: 'status',
      label: t(translations.common.status),
      hasSort: true,
      width: '20%',
    },
    {
      id: 'registerTime',
      label: t(translations.tableRequestPromoter.registerTime),
      hasSort: true,
      width: '20%',
    },
  ];

  const renderItem = (item: MembershipRequest, index?: number) => {
    return [
      item?.promotorName,
      item?.picName,
      item?.ktaNumber,
      item?.phone,
      <Status status={item.status} />,
      item?.registerTime
        ? moment(item?.registerTime).format('DD/MM/YYYY HH:mm')
        : '-',
    ];
  };

  return (
    <Grid sx={{ mt: 3 }}>
      <Toolbar
        onChangeFilter={onChangeFilter}
        filter={filter}
        onSearchPromoter={onSearchPromoter}
        searchValue={filter.promoterFilter?.name || ''}
        currentProvince={currentProvince}
        provinces={newProvinces}
        onChangeProvince={onChangeProvince}
      />
      <Table
        headers={headers}
        pageNumber={filter.offset}
        totalElements={totalElements}
        order={filter.promoterFilter?.orderType || 'desc'}
        onRequestSort={onRequestSort}
        orderBy={`${filter?.promoterFilter?.orderBy}`}
        items={items}
        renderItem={renderItem}
        onSelectRow={item => navigate(path.promoters + `/${item.id}`)}
        onPageChange={handleOnPageChange}
      />
    </Grid>
  );
});
