import { Grid, Paper } from '@mui/material';
import React, { useState, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import styled from 'styled-components';
import { Province } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';

import Card from '../../components/Card';
import { useMemberReportSlice } from '../slice';
import { selectMemberReport } from '../slice/selectors';
import DashboardLayout from '../components/DashboardLayout';

import { TableList } from './components/TableList';

const KIS = memo(() => {
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
      id: 'ktaNumber',
      label: t(translations.common.ktaNumber),
    },
    {
      id: 'clubName',
      label: t(translations.report.joinedIMIClub),
      hasSort: true,
    },
    {
      id: 'clubProvince',
      label: t(translations.createNewMemberPage.provinceClub),
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
      actions.fetchUpgradeKis({
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
          title={t(translations.dashboard.totalMemberOfUpgraded)}
          value={memberReport?.totalMemberOfUpgraded}
        />
        <Card
          title={t(translations.dashboard.totalOfUpgradedKISTypes)}
          value={memberReport?.totalOfUpgradedKisTypes}
        />
      </Grid>
    );
  }, [memberReport]);

  return (
    <div>
      <DashboardLayout
        title={t(translations.dashboard.kisDashboard)}
        provinces={provinces}
      >
        {items}
      </DashboardLayout>
      <TableList headers={headers} />
    </div>
  );
});

export default KIS;
