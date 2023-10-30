/**
 *
 * ClubManagement
 *
 */
import { Card } from '@mui/material';
import { withTitle } from 'app/components/HOC/WithTitle';
import React, { memo } from 'react';

import { Loading } from 'app/components/Loading';
import { useDispatch, useSelector } from 'react-redux';

import { ListClub } from './components/ListClub';

import { useClubManagementSlice } from './slice';
import { selectClubManagement } from './slice/selectors';

interface Props {}

const ClubManagement = memo((props: Props) => {
  const dispatch = useDispatch();
  const { actions } = useClubManagementSlice();
  const { clubList, isLoading } = useSelector(selectClubManagement);

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, [actions, dispatch]);

  return (
    <div>
      <Card sx={{ padding: '1rem' }}>
        <ListClub items={clubList?.data} totalElements={clubList?.count} />
      </Card>
      <Loading isLoading={isLoading} />
    </div>
  );
});
export default withTitle(ClubManagement, 'clubAssociationInformation.clubList');
