import { Grid } from '@mui/material';
import newIcon from 'app/pages/Reporting/icons/new-icon.svg';
import reNewIcon from 'app/pages/Reporting/icons/re-new-icon.svg';
import React, { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { useDispatch, useSelector } from 'react-redux';

import { selectAuth } from 'app/pages/Auth/slice/selectors';

import DashboardLayout from '../components/DashboardLayout';

import Card from '../../components/Card';

import { selectMemberReport } from '../slice/selectors';
import { useMemberReportSlice } from '../slice';

import { TableList } from './components/TableList';

interface Props {}
const KTADashBoard = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMemberReportSlice();
  const { provinces, memberReport } = useSelector(selectMemberReport);
  const fetchFormData = useSelector(selectAuth);
  const { userInformation } = fetchFormData;

  const headers = [
    {
      id: 'name',
      label: (
        <span style={{ width: 180 }}>
          {t(translations.tableMembership.name)}
        </span>
      ),
      hasSort: true,
      width: 250,
    },
    {
      id: 'ktaNumber',
      label: t(translations.common.ktaNumber),
    },
    {
      id: 'phone',
      label: t(translations.tableMembership.phoneNumber),
    },
    {
      id: 'packageName',
      label: (
        <span style={{ width: 100 }}>
          {t(translations.tableMembership.package)}
        </span>
      ),
      hasSort: true,
    },
    {
      id: 'provinceName',
      label: t(translations.common.province),
      hasSort: true,
    },
    {
      id: 'totalPrice',
      label: t(translations.kisInformation.price),
      hasSort: true,
    },
    {
      id: 'clubName',
      label: (
        <span style={{ width: 150 }}>
          {t(translations.tableOldMemberShip.clubName)}
        </span>
      ),
      width: 200,
    },
    {
      id: 'expirationDate',
      label: t(translations.common.expirationDate),
    },
    {
      id: 'transactionId',
      label: t(translations.common.transactionId),
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
    if (userInformation && userInformation.provinceId) {
      dispatch(
        actions.fetchMemberReport({ provinceId: userInformation.provinceId }),
      );
    } else {
      dispatch(actions.fetchMemberReport({}));
    }
    dispatch(actions.fetchProvinces());
    dispatch(
      actions.fetchMembershipHistory({
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
          icon={newIcon}
          title={t(translations.dashboard.totalNew)}
          value={memberReport?.totalNewKta}
        />
        <Card
          icon={newIcon}
          title={t(translations.dashboard.newMOBILITY)}
          value={memberReport?.totalNewKtaMobility}
        />

        <Card
          icon={newIcon}
          title={t(translations.dashboard.newPRO)}
          value={memberReport?.totalNewKtaPro}
        />
        <Grid container item xs={12} spacing={4}>
          <Card
            icon={newIcon}
            title={t(translations.common.upgradePro)}
            value={memberReport?.totalOfUpgradeToPro}
          />
        </Grid>
        <Card
          icon={reNewIcon}
          title={t(translations.dashboard.totalRenew)}
          value={memberReport?.totalRenewKta}
        />
        <Card
          icon={reNewIcon}
          title={t(translations.dashboard.renewMOBILITY)}
          value={memberReport?.totalRenewKtaMobility}
        />
        <Card
          icon={reNewIcon}
          title={t(translations.dashboard.renewPRO)}
          value={memberReport?.totalRenewKtaPro}
        />
      </Grid>
    );
  }, [memberReport]);

  return (
    <div>
      <DashboardLayout
        title={t(translations.dashboard.ktaDashboard)}
        provinces={provinces}
      >
        {items}
      </DashboardLayout>
      <TableList headers={headers} />
    </div>
  );
});

export default KTADashBoard;
