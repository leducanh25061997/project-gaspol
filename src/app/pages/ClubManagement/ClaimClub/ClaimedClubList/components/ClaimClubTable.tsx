import * as React from 'react';
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import CustomDataGrid from 'app/components/CustomDataGrid';
import styled from 'styled-components';
import classNames from 'classnames';

import Table from 'app/components/Table';
import { EllipsisText } from 'app/components/EllipsisText';
import { Avatar, Stack } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { useFilterList } from 'app/hooks/useFilterList';

import { ClaimedClubList, FilterParams } from '../slice/types';

import { selectClaimedClubList } from '../slice/selectors';
import { useClaimedClubListSlice } from '../slice';

import FilterBar from './FilterBar';

const getTextStatus = (status?: string) => {
  const textStatus = status ? status.toLowerCase() : '-';
  return textStatus === 'pending' ? 'Unmatched' : textStatus;
};
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
};
interface Props {
  provinceId: string;
}
function ClaimClubTable(props: Props) {
  const { provinceId } = props;
  const dispatch = useDispatch();
  const { actions } = useClaimedClubListSlice();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, count } = useSelector(selectClaimedClubList);

  const fetchDataForPage = (params: FilterParams) => {
    const data = {
      ...params,
      provinceId: params.provinceId || (provinceId ? provinceId : ''),
    };
    dispatch(actions.getClaimedClubList(data));
  };

  const { onFilterToQueryString, filterParams } = useFilterList({
    onFetchData: fetchDataForPage,
    defaultFilter: initialFilter,
  });

  React.useEffect(() => {
    onFilterToQueryString({
      ...filterParams,
      provinceId: filterParams?.provinceId || provinceId,
    });
  }, [provinceId]);

  const headers = [
    {
      id: 'claimer',
      label: t(translations.claimClubList.claimer),
    },
    {
      id: 'phoneNumber',
      label: t(translations.editMember.phoneNumber),
    },
    {
      id: 'memberProvince',
      label: t(translations.claimClubList.memberProvince),
    },
    {
      id: 'claimForClub',
      label: t(translations.claimClubList.claimForClub),
    },
    {
      id: 'clubProvince',
      label: t(translations.claimClubList.clubProvince),
    },
    {
      id: 'status',
      label: t(translations.common.status),
    },
    {
      id: 'claimTime',
      label: t(translations.claimClubList.claimTime),
    },
  ];

  const handleChangePage = (page: number, size: number) => {
    const newFilterParams = {
      ...filterParams,
      page,
      size,
    };
    onFilterToQueryString(newFilterParams);
  };

  const handleRowClick = (data: ClaimedClubList) => {
    navigate(`/clubs/claim-club-details/${data.id}`, {
      state: { status: data.status },
    });
  };

  const renderItem = (item: ClaimedClubList) => {
    return [
      <Stack direction="row" alignItems="center" spacing={3}>
        <Avatar src={item.profilePicture} sx={{ width: 31, height: 31 }} />
        <EllipsisText text={String(item.name)}></EllipsisText>
      </Stack>,
      <EllipsisText text={item.phone}></EllipsisText>,
      <EllipsisText text={item?.ktaProvinceName}></EllipsisText>,
      <EllipsisText text={item.clubName}></EllipsisText>,
      <EllipsisText text={item?.provinceName}></EllipsisText>,
      <StatusContainer
        className={classNames(
          'fs-12 fw-700 py-1 px-8 lh-20',
          { pending: item.status === 'PENDING' },
          { done: item.status === 'DONE' },
        )}
      >
        {getTextStatus(item.status)}
      </StatusContainer>,
      <EllipsisText
        text={moment(item.claimTime).format('DD/MM/YYYY HH:mm')}
      ></EllipsisText>,
    ];
  };

  return (
    <>
      <FilterBar
        onFilterToQueryString={onFilterToQueryString}
        filterParams={filterParams}
        provinceId={provinceId}
      />
      <Table
        headers={headers}
        items={data}
        pageNumber={filterParams.page}
        limitElement={filterParams.size}
        onPageChange={handleChangePage}
        totalElements={count}
        order="asc"
        orderBy=""
        renderItem={renderItem}
        className="mt-15"
        onSelectRow={handleRowClick}
      />
    </>
  );
}

export default React.memo(ClaimClubTable);
