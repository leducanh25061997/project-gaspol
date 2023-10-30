import React, { memo } from 'react';
import { withTitle } from 'app/components/HOC/WithTitle';

import { useDispatch, useSelector } from 'react-redux';

import { FilterAssociationParams } from 'types';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import { TableList } from './components/TableList';
import { useClubAssociationManagementSlice } from './slice';
import { selectClubAssociationManagement } from './slice/selectors';

interface Props {}

const ClubAssociationManagement = memo((props: Props) => {
  const dispatch = useDispatch();
  const { actions } = useClubAssociationManagementSlice();
  const { associationManagement } = useSelector(
    selectClubAssociationManagement,
  );
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  // const fetchDataForPage = (page: number = 0, size: number = 10) => {
  //   dispatch(
  //     actions.fetchClubsData({
  //       size,
  //       page,
  //     }),
  //   );
  //   dispatch(actions.fetchProvinces());
  // };

  const fetchDataForPage = (page: number = 0, size: number = 10) => {
    dispatch(
      actions.fetchAssociationList({
        size,
        page,
        provinceId: userInformation?.provinceId
          ? userInformation.provinceId
          : '',
        // associationFilter: {
        //   orderBy: params?.associationFilter?.orderBy,
        //   orderType: params?.associationFilter?.orderType,
        //   name: params?.associationFilter?.name,
        //   status: params.associationFilter?.status,
        //   provinceId: params.associationFilter?.provinceId,
        //   adArt: params?.associationFilter?.adArt,
        //   star: params?.associationFilter?.star,
        // },
      }),
    );
    dispatch(actions.fetchProvinces());
  };

  React.useEffect(() => {
    fetchDataForPage();
  }, []);
  return <TableList provinceId={userInformation?.provinceId} />;
});

export default withTitle(
  ClubAssociationManagement,
  'clubAssociationManagement.headerTitle',
);
