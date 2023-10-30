/**
 *
 * TableList
 *
 */
import { Avatar, Grid, Stack } from '@mui/material';
import { EllipsisText } from 'app/components/EllipsisText';
import Table from 'app/components/Table';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import moment from 'moment';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FilterParams, RequestJoinClubList } from 'types';
import { ClubRequestStatus, OrderType, Roles } from 'types/enums';

import { useMemberRequestJoinClubSlice } from '../../slice';

import { Toolbar } from '../Toolbar';

interface Props {
  items?: RequestJoinClubList[];
  totalElements?: number;
}

export const TableList = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  const { items, totalElements } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = useMemberRequestJoinClubSlice();
  const [filter, setFilter] = React.useState<FilterParams>({
    status: ClubRequestStatus.VERIFYING,
    limit: 10,
    page: 0,
    isImiAdmin: null,
    orderBy: '',
    name: '',
    orderType: OrderType.ASC,
  });
  const fetchDataForPage = (params: FilterParams) => {
    dispatch(
      actions.fetchMembersList({
        status: params.status,
        limit: params.limit,
        offset: params.page,
        isImiAdmin: params.isImiAdmin,
        name: params.name,
        orderBy: params.orderBy,
        orderType: params.orderType,
      }),
    );
  };

  const handleFetchDataForPage = (params: FilterParams) => {
    fetchDataForPage({
      status: params.status,
      limit: params.limit,
      offset: params.page,
      isImiAdmin: params.isImiAdmin,
      name: params.name,
      orderBy: params.orderBy,
      orderType: params.orderType,
    });
  };

  const onSearchUSer = (value: string) => {
    const newFilter = {
      ...filter,
      name: value,
    };
    handleFetchDataForPage(newFilter);
    setFilter(newFilter);
  };

  const onChangeFilter = (params: FilterParams) => {
    handleFetchDataForPage(params);
    setFilter({
      ...filter,
      isImiAdmin: params.isImiAdmin,
    });
  };

  const onRequestSort = (event: any, property: string) => {
    const newOrderType =
      property && filter.orderType === OrderType.ASC
        ? OrderType.DESC
        : OrderType.ASC;

    const newFilter = {
      ...filter,
      orderBy: property,
      orderType: newOrderType,
    };

    handleFetchDataForPage(newFilter);
    setFilter(newFilter);
  };

  const handleOnPageChange = (pageNumber: number, limit: number) => {
    const newFilter = {
      ...filter,
      limit,
      page: pageNumber,
    };

    handleFetchDataForPage(newFilter);
    setFilter(newFilter);
  };

  const headers = [
    {
      id: 'name',
      label: t(translations.common.name),
      hasSort: true,
    },
    {
      id: 'phoneNumber',
      label: t(translations.tableMembership.phoneNumber),
    },
    {
      id: 'joinAsRole',
      label: t(translations.tableMembership.joinAsRole),
    },
    {
      id: 'province',
      label: t(translations.common.province),
    },
    {
      id: 'created_date',
      label: t(translations.tableMembership.registerTime),
      hasSort: true,
    },
  ];

  const getRoles = (role: string[]) => {
    const newRoles: string[] = [];
    role.map(item => {
      switch (item) {
        case 'PRIME_MEMBER':
          newRoles.push(Roles.PRIME_MEMBER);
          break;
        case 'SUB_MEMBER':
          newRoles.push(Roles.SUB_MEMBER);
          break;
        default:
          break;
      }
    });
    return newRoles;
  };

  const renderItem = (item: RequestJoinClubList, index?: number) => {
    const roles = item.roles ? getRoles(item.roles).toString() : '';
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <div>
          <Avatar src={item.avatarUrl} sx={{ width: 35, height: 35 }} />{' '}
        </div>
        <EllipsisText text={String(item?.name)}></EllipsisText>
      </Stack>,
      item.phone,
      roles,
      item.provinceName,
      moment(item.createdDate).format('DD/MM/YYYY HH:mm'),
    ];
  };

  return (
    <Grid>
      <Toolbar
        searchValue={filter.name || ''}
        onSearchUSer={onSearchUSer}
        filter={filter}
        onChangeFilter={onChangeFilter}
      />
      <Table
        headers={headers}
        items={items}
        pageNumber={filter.page}
        totalElements={totalElements}
        renderItem={renderItem}
        onRequestSort={onRequestSort}
        order={filter.orderType || 'asc'}
        orderBy={filter.orderBy || ''}
        onSelectRow={item => {
          navigate(path.memberRequestJoinClub + `/${item.id}`, {
            state: { id: item.id },
          });
        }}
        onPageChange={handleOnPageChange}
      />
    </Grid>
  );
});
