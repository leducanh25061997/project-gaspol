/**
 *
 * ListMerchant
 *
 */
import { Avatar, Card, Stack } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import TableToolbar from 'app/components/TableToolbar';
import { translations } from 'locales/translations';
import Table from 'app/components/Table';
import { MerchantRequests } from 'types';
import moment from 'moment';
import { MembershipType, OrderType } from 'types/enums';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { debounce, isEmpty, isNil, isUndefined } from 'lodash';

import { useMerchantRequestSlice } from '../../slice';

interface Props {
  headers: any[];
  totalElements?: number;
  items?: MerchantRequests[];
}

export const ListMerchant = memo((props: Props) => {
  const { actions } = useMerchantRequestSlice();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { headers, totalElements, items } = props;
  const [order, setOrder] = React.useState<OrderType>('desc' as OrderType);
  const [orderBy, setOrderBy] = React.useState('name');
  const [filterName, setFilterName] = React.useState('');
  const [dateFromRequest, setDateFromRequest] = React.useState<number>(0);
  const [dateToRequest, setDateToRequest] = React.useState<number>(Date.now());
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [orderRequest, setOrderRequest] = React.useState<OrderType>(
    OrderType.DESC,
  );

  const renderItem = (item: MerchantRequests, index?: number) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <div>
          <Avatar src={item.avatar} sx={{ width: 35, height: 35 }} />{' '}
        </div>
        <div>{item.name}</div>
      </Stack>,
      item.phone,
      item.companyName,
      item.companyNpwp,
      moment(item.registerTime).format('DD/MM/YYYY HH:mm'),
    ];
  };

  const fetchMerchantPage = (
    page: number,
    limit: number,
    keyword?: string,
    orderBy?: string,
    orderType?: OrderType,
    fromRegisterTime?: number,
    toRegisterTime?: number,
  ) => {
    dispatch(
      actions.fetchMerchantRequests({
        limit,
        offset: page,
        name: keyword,
        membershipType: MembershipType.GASPOL_MERCHANT,
        orderBy,
        orderType,
        fromRegisterTime,
        toRegisterTime,
      }),
    );
  };

  const onKeyPress = (event: any) => {
    event.defaultMuiPrevented = true;
    fetchMerchantPage(
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

  const handleFetchDataForPage = (
    page: number,
    limit: number,
    keyword?: string,
    orderBy?: string,
    orderType?: OrderType,
    fromRegisterTime?: number,
    toRegisterTime?: number,
  ) => {
    fetchMerchantPage(
      page,
      limit,
      keyword,
      orderBy,
      orderType,
      fromRegisterTime,
      toRegisterTime,
    );
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

  const onFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterName(value);
    if (isEmpty(value) && fetchMerchantPage) {
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

  return (
    <Card>
      <TableToolbar
        numSelected={0}
        filterName={filterName}
        placeholder={t(translations.verifyMerchant.searchHolderPlace)}
        onChecked={() => {}}
        onKeyPress={onKeyPress}
        filterList={[]}
        onFilterName={onFilterByName}
        isAllowFillter={false}
      />
      <Table
        totalElements={totalElements}
        items={items}
        renderItem={renderItem}
        headers={headers}
        order={orderRequest}
        orderBy={orderBy}
        onPageChange={handleOnPageChange}
        onRequestSort={onRequestSort}
      />
    </Card>
  );
});
