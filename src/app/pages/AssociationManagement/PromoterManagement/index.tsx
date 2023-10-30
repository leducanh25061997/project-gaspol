/**
 *
 * Management
 *
 */
import React, { memo } from 'react';
import { withTitle } from 'app/components/HOC/WithTitle';

import { Card } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'app/components/Loading';
import { MembershipType } from 'types/enums';

import { ListPromoter } from './components/ListPromoter';

import { usePromoterManagementSlice } from './slice';
import { selectPromoterManagement } from './slice/selectors';

interface Props {}

const PromoterManagement = memo((props: Props) => {
  const dispatch = useDispatch();
  const { actions } = usePromoterManagementSlice();
  const { promoterList, isLoading } = useSelector(selectPromoterManagement);

  return (
    <div>
      <Card sx={{ padding: '1rem' }}>
        <ListPromoter
          items={promoterList?.data}
          totalElements={promoterList?.total}
        />
      </Card>
      <Loading isLoading={isLoading} />
    </div>
  );
});
export default withTitle(PromoterManagement, 'sidebar.promoterManagement');
