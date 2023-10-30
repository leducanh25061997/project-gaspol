import { Grid, Paper } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';

import Card from '../../components/Card';
import DashBoardLayout from '../components/DashboardLayout';
import { useMemberReportSlice } from '../slice';
import { selectMemberReport } from '../slice/selectors';

import { TableList } from './components/TableList';

const ChangeHistory = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { provinces, memberReport } = useSelector(selectMemberReport);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;
  const headers = [
    {
      id: 'name',
      label: t(translations.tableMembership.name),
      hasSort: true,
    },
    {
      id: 'oldClub',
      label: t(translations.common.oldClub),
    },
    {
      id: 'newClub',
      label: t(translations.common.newClub),
      hasSort: true,
    },
    {
      id: 'transactionTime',
      label: t(translations.common.transactionTime),
      hasSort: true,
    },
  ];

  React.useEffect(() => {
    const page: number = 0;
    const size: number = 10;
    dispatch(actions.fetchProvinces());
    dispatch(actions.fetchMemberReport({}));
    dispatch(
      actions.fetchChangeHistory({
        size,
        page,
        provinceId: userInformation?.provinceId
          ? userInformation.provinceId
          : '',
      }),
    );
  }, [userInformation]);

  const items = useMemo(() => {
    return (
      <Grid container spacing={4}>
        <Card
          title={t(translations.dashboard.totalChange)}
          value={memberReport?.totalChange}
        />
      </Grid>
    );
  }, [memberReport]);

  return (
    <div>
      <DashBoardLayout
        title={t(translations.dashboard.memberSwitchClub)}
        provinces={provinces}
      >
        {items}
      </DashBoardLayout>
      <TableList headers={headers} />
    </div>
  );
};

export default ChangeHistory;
