/**
 *
 * TableList
 *
 */
import React, { memo, useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Table from 'app/components/Table';
import { FilterListParams, FilterMemberValue, TableHeaderProps } from 'types';
import { ClaimList } from 'types/ClaimList';
import path from 'app/routes/path';
import { useDispatch } from 'react-redux';
import { Avatar, Stack } from '@mui/material';
import { debounce, isEmpty } from 'lodash';
import styled from 'styled-components';
import classNames from 'classnames';
import {
  MembershipType,
  OrderType,
  MemberStatus,
  PackageMemberType,
} from 'types/enums';
import { EllipsisText } from 'app/components/EllipsisText';
import { Status } from 'app/components/Status';
import { FilterClaimValue } from 'types/FilterParams';

import { CustomDialog } from 'app/components/CustomDialog';
import { LoadingButton } from '@mui/lab';

import { useFilterList } from 'app/hooks/useFilterList';

import ToolbarFilter from '../ToolbarFilter';
import { useClaimListSlice } from '../../slice';
import { FilterStatusType } from '../../slice/types';

interface Props {
  headers: TableHeaderProps[];
  items?: ClaimList[];
  totalElements?: number;
  exporting?: boolean;
  provinceId?: string;
}
interface ParamsPageProps extends FilterListParams {
  keyword?: string;
  orderBy?: OrderType;
  orderType?: string;
  status?: FilterStatusType | undefined;
}

const StatusContainer = styled.div`
  text-transform: capitalize;
  border-radius: 8px;
  width: fit-content;
  &.done {
    color: #229a16;
    background: rgba(84, 214, 44, 0.16);
  }

  &.pending {
    background: rgba(255, 193, 7, 0.16);
    color: #b78103;
  }
`;

const initialFilter = {
  size: 10,
  page: 0,
  status: undefined,
  order: OrderType.DESC,
};

export const TableList = memo((props: Props) => {
  const { headers, items, totalElements, exporting, provinceId } = props;

  const dispatch = useDispatch();
  const { actions } = useClaimListSlice();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fetchDataForPage = (params: ParamsPageProps) => {
    const data = {
      ...params,
      provinceId: params.provinceId || (provinceId ? provinceId : ''),
    };
    dispatch(actions.fetchClaimList(data));
  };

  const { onFilterToQueryString, filterParams } = useFilterList({
    onFetchData: fetchDataForPage,
    defaultFilter: initialFilter,
  });

  const getTextStatus = (status?: string) => {
    const textStatus = status ? status.toLowerCase() : '-';
    return textStatus === 'pending' ? 'Unmatched' : textStatus;
  };

  React.useEffect(() => {
    if (provinceId) {
      onFilterToQueryString({ ...filterParams, provinceId });
    }
  }, [provinceId, filterParams]);

  const renderItem = (item: ClaimList, index?: number) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <Avatar src={item.avatarUrl} sx={{ width: 31, height: 31 }} />
        <EllipsisText text={String(item.username)}></EllipsisText>
      </Stack>,
      item.ktaNumber,
      <EllipsisText text={item?.phone}></EllipsisText>,
      item.nikNumber,
      item.provinceName,
      <StatusContainer
        className={classNames(
          'fs-12 fw-700 py-1 px-8 lh-20',
          { pending: item?.status === 'PENDING' },
          { done: item?.status === 'DONE' },
        )}
      >
        {getTextStatus(item.status)}
      </StatusContainer>,
      moment(item?.createdDate).format('DD/MM/YYYY HH:mm'),
    ];
  };

  const handleOnPageChange = (pageNumber: number, limit: number) => {
    const newFilterParams = {
      ...filterParams,
      page: pageNumber,
      size: limit,
    };
    onFilterToQueryString(newFilterParams);
  };

  return (
    <>
      <ToolbarFilter
        onFilterToQueryString={onFilterToQueryString}
        filterParams={filterParams}
        exporting={exporting}
        provinceId={provinceId as string}
      />
      <Stack sx={{ mt: '15px' }}>
        <Table
          headers={headers}
          items={items}
          pageNumber={filterParams.page}
          totalElements={totalElements}
          renderItem={renderItem}
          onSelectRow={item =>
            navigate(path.memberClaim + `/${item.id}`, {
              state: {
                id: item.id,
                name: item.username,
                phone: item.phone,
                status: item.status,
                oldKtaNumber: item.ktaNumber,
              },
            })
          }
          onPageChange={handleOnPageChange}
          order={'desc'}
          orderBy={''}
        />
      </Stack>
    </>
  );
});
