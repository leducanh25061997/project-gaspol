/**
 *
 * MemberRequestJoinClub
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { withTitle } from 'app/components/HOC/WithTitle';
import { useDispatch, useSelector } from 'react-redux';

import { FilterParams } from 'types';
import { ClubRequestStatus, OrderType } from 'types/enums';

import { Card } from '@mui/material';

import { useMemberRequestJoinClubSlice } from './slice';
import { selectMemberRequestJoinClub } from './slice/selectors';

import { TableList } from './components/TableList';

interface Props {}

const MemberRequestJoinClub = memo((props: Props) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { actions } = useMemberRequestJoinClubSlice();
  const { membersList } = useSelector(selectMemberRequestJoinClub);

  const fetchDataForPage = (params: FilterParams) => {
    dispatch(
      actions.fetchMembersList({
        status: params.status,
        limit: params.limit,
        offset: params.page,
        isImiAdmin: params.isImiAdmin,
        orderType: params.orderType,
      }),
    );
  };

  React.useEffect(() => {
    fetchDataForPage({
      status: ClubRequestStatus.VERIFYING,
      limit: 10,
      page: 0,
      isImiAdmin: null,
      orderType: OrderType.ASC,
    });
  }, []);

  return (
    <Card sx={{ padding: '1rem' }}>
      <TableList items={membersList?.data} totalElements={membersList?.total} />
    </Card>
  );
});

export default withTitle(MemberRequestJoinClub, 'memberRequestJoinClub.title');
