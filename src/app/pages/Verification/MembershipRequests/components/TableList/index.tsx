/**
 *
 * TableList
 *
 */
import TableToolbar from 'app/components/TableToolbar';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate } from 'react-router-dom';
import Table from 'app/components/Table';
import { MembershipRequest } from 'types';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Card } from '@mui/material';
import moment from 'moment';
import { MembershipType, OrderType } from 'types/enums';
import { debounce, isEmpty, isNil, isUndefined } from 'lodash';

import { useMembershipRequestsSlice } from '../../slice';

interface Props {
  headers: any[];
  items?: MembershipRequest[];
  totalElements?: number;
}

export const TableList = memo((props: Props) => {
  const { headers, items, totalElements } = props;

  const dispatch = useDispatch();
  const { actions } = useMembershipRequestsSlice();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [order, setOrder] = useState<OrderType>(OrderType.DESC);
  const [orderRequest, setOrderRequest] = useState<OrderType>(OrderType.DESC);
  const [filterName, setFilterName] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [dateFromRequest, setDateFromRequest] = useState<number>(
    Date.now() - 86400000,
  );
  const [dateToRequest, setDateToRequest] = useState<number>(Date.now());
  const [isChecked, setIsChecked] = useState({
    inLimit: true,
    outLimit: false,
  });
  const fetchDataForPage = (
    page: number,
    limit: number,
    keyword?: string,
    orderBy?: string,
    orderType?: OrderType,
    fromRegisterTime?: number,
    toRegisterTime?: number,
  ) => {
    dispatch(
      actions.fetchMembershipRequests({
        limit,
        offset: page,
        name: keyword,
        membershipType: MembershipType?.KTA,
        orderBy,
        orderType,
        fromRegisterTime,
        toRegisterTime,
      }),
    );
  };

  const fieldList = [
    {
      id: 0,
      title: 'Within 24 Hours',
      value: 'in',
      isChecked: isChecked.inLimit,
    },
    {
      id: 0,
      title: 'Over 24 Hours',
      value: 'out',
      isChecked: isChecked.outLimit,
    },
  ];

  const handleFilterData = (value: string) => {
    if (value === 'in') {
      handleFetchDataForPage(
        0,
        rowsPerPage,
        filterName,
        orderBy,
        OrderType.DESC,
        Date.now() - 86400000,
        Date.now(),
      );
      setPage(0);
      setIsChecked({ outLimit: false, inLimit: true });
      setOrder(OrderType.DESC);
      setDateFromRequest(Date.now() - 86400000);
      setDateToRequest(Date.now());
    } else if (value === 'out') {
      handleFetchDataForPage(
        0,
        rowsPerPage,
        filterName,
        orderBy,
        OrderType.DESC,
        0,
        Date.now() - 86400000,
      );
      setPage(0);
      setIsChecked({ outLimit: true, inLimit: false });
      setOrder(OrderType.DESC);
      setDateFromRequest(0);
      setDateToRequest(Date.now() - 86400000);
    }
  };

  const renderItem = (item: MembershipRequest, index?: number) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <div>
          <Avatar
            src={item.avatarPictureLink || item.avatar}
            sx={{ width: 35, height: 35 }}
          />{' '}
        </div>
        <div>{item.name}</div>
      </Stack>,
      item.phone,
      item.ktaNumber,
      item.provinceName,
      moment(item.registerTime).format('DD/MM/YYYY HH:mm'),
    ];
  };

  const onFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterName(value);
    if (isEmpty(value) && fetchDataForPage) {
      const fetchData = debounce(
        () =>
          handleFetchDataForPage(
            0,
            rowsPerPage,
            value,
            orderBy,
            order,
            dateFromRequest,
            dateToRequest,
          ),
        1000,
      );
      fetchData();
      setFilterName(value);
      setPage(0);
    }
  };

  const handleFetchDataForPage = (
    page: number,
    limit: number,
    keyword?: string,
    orderBy?: string,
    orderType?: OrderType,
    fromRegisterTime?: number,
    toRegisterTime?: number,
  ) => {
    fetchDataForPage(
      page,
      limit,
      keyword,
      orderBy,
      orderType,
      fromRegisterTime,
      toRegisterTime,
    );
  };

  const onRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && orderRequest === 'asc';
    handleFetchDataForPage(
      page,
      rowsPerPage,
      filterName,
      property,
      isAsc ? OrderType.ASC : OrderType.DESC,
      dateFromRequest,
      dateToRequest,
    );
    setOrderRequest(isAsc ? OrderType.DESC : OrderType.ASC);
    setOrder(isAsc ? OrderType.ASC : OrderType.DESC);
    setOrderBy(property);
  };

  const onKeyPress = (event: any) => {
    event.defaultMuiPrevented = true;
    fetchDataForPage(
      0,
      rowsPerPage,
      filterName,
      orderBy,
      order,
      dateFromRequest,
      dateToRequest,
    );
    setPage(0);
  };

  const handleOnPageChange = (pageNumber: number, limit: number) => {
    handleFetchDataForPage(
      pageNumber,
      limit,
      filterName,
      orderBy,
      order,
      dateFromRequest,
      dateToRequest,
    );
    setRowsPerPage(limit);
    setPage(pageNumber);
  };

  return (
    <Card>
      <TableToolbar
        isAllowFillter={true}
        numSelected={0}
        width={460}
        filterName={filterName}
        onFilterName={onFilterByName}
        placeholder={t(translations.tableMembership.searchPlaceholderNik)}
        onChecked={handleFilterData}
        onKeyPress={onKeyPress}
        filterList={fieldList}
      />
      <Table
        headers={headers}
        items={items}
        totalElements={totalElements}
        renderItem={renderItem}
        onSelectRow={item =>
          navigate(path.verifyIndividualMember + `/${item.id}`, {
            state: { id: item.id },
          })
        }
        order={orderRequest}
        orderBy={orderBy}
        onRequestSort={onRequestSort}
        onPageChange={handleOnPageChange}
      />
    </Card>
  );
});
